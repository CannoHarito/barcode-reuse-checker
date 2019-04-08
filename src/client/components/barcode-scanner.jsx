import React from 'react';
// import FormInput from './form-input';
// import SheetButton from './sheet-button';

export default class BarcodeScanner extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { names: [] };
  //   this.deleteButtonHandler = this.deleteButtonHandler.bind(this);
  //   this.clickSheetNameHandler = this.clickSheetNameHandler.bind(this);
  //   this.newSheetFormHandler = this.newSheetFormHandler.bind(this);
  // }

  // componentDidMount() {
  //   google.script.run
  //     .withSuccessHandler((data) => this.setState({ names: data }))
  //     .withFailureHandler((error) => alert(error))
  //     .getSheetsData();
  // }

  // deleteButtonHandler(e, sheetIndex) {
  //   return google.script.run
  //     .withSuccessHandler((data) => this.setState({ names: data }))
  //     .withFailureHandler((error) => alert(error))
  //     .deleteSheet(sheetIndex);
  // }

  // clickSheetNameHandler(e, sheetName) {
  //   return google.script.run
  //     .withSuccessHandler((data) => this.setState({ names: data }))
  //     .withFailureHandler((error) => alert(error))
  //     .setActiveSheet(sheetName);
  // }

  // newSheetFormHandler(e, newSheetTitle) {
  //   return google.script.run
  //     .withSuccessHandler((data) => this.setState({ names: data }))
  //     .withFailureHandler((error) => alert(error))
  //     .addSheet(newSheetTitle);
  // }

  render() {
    // let names = this.state.names;
    return (
      <div>テストです。{/*
    //     <FormInput newSheetFormHandler={this.newSheetFormHandler} />
    //       {names.length ? names.map((name) => {
    //         return <SheetButton
    //           name={name}
    //           deleteButtonHandler={this.deleteButtonHandler}
    //           clickSheetNameHandler={this.clickSheetNameHandler}
    //           key={name.sheetName}
    //         />;
    //       })
    //         : null}
      //     </ReactCSSTransitionGroup>*/}
      </div>
    );
  }
}
