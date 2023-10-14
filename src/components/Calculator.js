import "./Calculator.css";
import React, { Component } from "react";
import Display from "./Display";
import Keypad from "./Keypad";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "0",
      isCalculated: false,
      expression: [],
      isNegative: false,
    };
  }

  handleButtonClick = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      this.handleNumber(value);
    } else if (["+", "-", "*", "/"].includes(value)) {
      this.handleOperator(value);
    } else if (value === "←") {
      this.handleBackspace();
    } else if (value === "%") {
      this.setState({
        inputValue: (parseFloat(this.state.inputValue) / 100).toString(),
      });
    } else if (value === "=") {
      this.handleEqual();
    }
  };

  handleNumber = (number) => {
    const { inputValue, expression, isCalculated, isNegative } = this.state;
    let newNumber = isNegative ? "-" + number : number;
    if (number === "0" && inputValue === "0") {
      return;
    } else if (isCalculated) {
      this.setState({
        expression: [newNumber],
        inputValue: newNumber,
        isCalculated: false,
      });
    } else {
      if (
        typeof expression[expression.length - 1] === "string" &&
        !isNaN(expression[expression.length - 1])
      ) {
        const combinedNumber = expression[expression.length - 1] + newNumber;
        this.setState({
          expression: [...expression.slice(0, -1), combinedNumber],
          inputValue: combinedNumber,
        });
      } else {
        this.setState({
          expression: [...expression, newNumber],
          inputValue: inputValue === "0" ? newNumber : inputValue + newNumber,
        });
      }
    }
    if (isNegative) {
      this.setState({ isNegative: false });
    }
  };



  render() {
    const { inputValue } = this.state;
    return (
      <div className="calculator">
        <Display value={this.state.inputValue} />
        <Keypad
          handleButtonClick={this.handleButtonClick}
        />
      </div>
    );
  }
}
