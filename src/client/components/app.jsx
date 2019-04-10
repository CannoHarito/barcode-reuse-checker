import React from 'react';
import BarcodeScanner from './barcode-scanner';
import FormInput from './form-input';
import Item from './item';
import '../styles.css';
const testdata = new Map().set('TestQuery',
    { TestService: [{ price: '100', title: 'TestTitle' }] });
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            querys: testdata,
            isScannerOpen: false,
        };
        this.startSearch = this.startSearch.bind(this);
        this.changeScannerState = this.changeScannerState.bind(this);
    }
    componentDidMount() {
        const query = '<?= query ?>';
        if (query.length > 0) this.startSearch(query);
    }
    setSearchResult(data) {
        this.setState((state) => ({
            querys: new Map(state.querys).set(data.query,
                Object.assign(
                    {},
                    state.querys.get(data.query),
                    { [data.service]: data.items }
                )
            ),
        }));
    }
    startSearch(query) {
        if (!query) return;
        const querys = new Map(this.state.querys);
        if (querys.get(query)) {
            alert('Already exists: ' + query);
            return;
        }
        this.setState({ querys: querys.set(query, {}) });
        google.script.run
            .withSuccessHandler((data) => this.setSearchResult(data))
            .withFailureHandler((error) => alert(error))
            .fetchPrice('BookOffOnline', query);
        google.script.run
            .withSuccessHandler((data) => this.setSearchResult(data))
            .withFailureHandler((error) => alert(error))
            .fetchPrice('NetOff', query);
    }
    changeScannerState(isOpen) {
        this.setState((state) => ({
            isScannerOpen: isOpen,
        }));
    }
    render() {
        const items = Array.from(this.state.querys).map(([query, obj]) =>
            <Item key={query} query={query} result={obj} />
        );
        const scanner = this.state.isScannerOpen ?
            (<BarcodeScanner
                changeScannerState={this.changeScannerState}
                startSearch={this.startSearch} />)
            :
            (<button onClick={() => this.changeScannerState(true)}>
                バーコードスキャン
            </button>);
        return (
            <div>
                {scanner}
                <FormInput startSearch={this.startSearch} />
                <ol>
                    {items}
                </ol>
            </div>
        );
    }
}
