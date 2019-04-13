import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input } from 'muicss/react';

export default class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.query.length) {
      this.props.startSearch(this.state.query);
      this.setState({ query: '' });
    }
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} >
        <Input type="search" placeholder="ISBN,JAN,タイトル..."
          onChange={this.handleChange} value={this.state.query} />
        <Button type="submit" variant="raised" >検索</Button>
        <Button color="primary" variant="raised"
          onClick={() => this.props.changeScannerState(true)} >
          バーコードスキャン
        </Button>
      </Form>
    );
  }
}

FormInput.propTypes = {
  startSearch: PropTypes.func,
  changeScannerState: PropTypes.func,
};
