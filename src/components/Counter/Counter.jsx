// import PropTypes from 'prop-types';
import { Component } from 'react';
export class Counter extends Component {
  state = {
    value: 0,
  };
  handleIncrement = () => {
    console.log('Click on btn +1');
    // console.log(this);
    // console.log(e.target);
    // const { target } = e;
    // setTimeout(() => {
    //   console.log(target);
    // }, 2000);
    this.setState({ value: this.state.value + 1 });
  };
  handleDecrement = e => {
    console.log('Click on btn -1');
    // console.log(this);
    // console.log(e.target);
    this.setState({ value: this.state.value - 1 });
  };
  render() {
    return (
      <div className="Counter">
        <span className="Counter__value">{this.state.value}</span>

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
