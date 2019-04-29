import React from 'react';
import BarcodeScanner from './barcode-scanner';
import FormInput from './form-input';
import Item from './item';
import { Container } from 'muicss/react';
import '../styles.css';
// const testdata = new Map().set('TestQuery',
//     { TestService: [{ price: '100', title: 'TestTitle' }] });

const SERVICES = ['BookOffOnline', 'NetOff', 'Surugaya'];
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            querys: new Map(),
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
    fetchPrice(services, query) {
        if (services.length <= 0) return;
        const service = services.shift();
        google.script.run
            .withSuccessHandler((data) => {
                this.setSearchResult(data);
                this.fetchPrice(services, query);
            })
            .withFailureHandler((error) => alert(error))
            .fetchPrice(service, query);
    }
    startSearch(query) {
        if (!query) return;
        if (this.state.querys.get(query)) {
            return this.setState((state) => {
                const querys = new Map(state.querys);
                const obj = querys.get(query);
                querys.delete(query);
                return {
                    querys:
                        querys.set(query, obj),
                };
            });
        }
        this.setState((state) => ({
            querys:
                new Map(state.querys).set(query, {}),
        }));
        this.fetchPrice(SERVICES.concat(), query);
    }
    changeScannerState(isOpen) {
        this.setState((state) => ({
            isScannerOpen: isOpen,
        }));
    }
    render() {
        const items = Array.from(this.state.querys).reverse()
            .map(([query, obj]) =>
                <Item key={query} query={query} result={obj} />
            );
        const scanner = this.state.isScannerOpen ?
            (<BarcodeScanner
                changeScannerState={this.changeScannerState}
                startSearch={this.startSearch} />)
            :
            (<FormInput
                startSearch={this.startSearch}
                changeScannerState={this.changeScannerState} />);
        return (
            <Container fluid={true} >
                {scanner}
                {items}
            </Container>
        );
    }
}
