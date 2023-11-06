import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Filter extends Component {
  render() {
    return (
      <div>
        <p>Find contacts by name</p>
        <input
          type="text"
          name="filter"
          value={this.props.filter}
          onChange={this.props.changeFilter}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string,
};
