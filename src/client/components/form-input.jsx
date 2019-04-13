import React from 'react';
import PropTypes from 'prop-types';

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
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input type="search"
          onChange={this.handleChange} value={this.state.query} />
        <input type="submit" value="検索" />
      </form>
    );
  }
}

FormInput.propTypes = {
  startSearch: PropTypes.func,
};
