import PropTypes from 'prop-types';
import { Component } from 'react';
export class Counter extends Component {
  handleIncrement = e => {
    console.log('Click on btn +1');
    console.log(this);
    console.log(e.target);
  };
  handleDecrement = e => {
    console.log('Click on btn -1');
    console.log(this);
    console.log(e.target);
  };
  render() {
    return (
      <div className="Counter">
        <span className="Counter__value">0</span>

        <div className="Counter__controls">
          <button type="button" onClick={this.handleIncrement}>
            increment
          </button>
          <button type="button" onClick={this.handleDecrement}>
            decrement
          </button>
        </div>
      </div>
    );
  }
}

Counter.propTypes = {};
