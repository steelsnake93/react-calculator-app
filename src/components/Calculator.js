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

  handleOperator = (operation) => {
    const { inputValue, expression, isCalculated } = this.state;
    if (isCalculated) {
      this.setState({
        expression: [inputValue, operation],
        isCalculated: false,
        inputValue: "0",
      });
    } else {
      let lastElement = expression[expression.length - 1];
      if (lastElement && lastElement.endsWith(".")) {
        lastElement = lastElement + "0";
        this.setState({
          expression: [...expression.slice(0, -1), lastElement, operation],
          inputValue: "0",
        });
      } else if (
        ["+", "-", "*", "/"].includes(expression[expression.length - 1])
      ) {
        if (operation === "-" && expression[expression.length - 1] !== "-") {
          this.setState({ isNegative: true });
          return;
        } else {
          this.setState({
            expression: [...expression.slice(0, -1), operation],
            isNegative: false,
            inputValue: "0",
          });
        }
      } else {
        this.setState({
          expression: [...expression, operation],
          inputValue: "0",
        });
      }
    }
  };

  handleEqual = () => {
    const { expression } = this.state;
    if (!expression.length) return;
    let result = parseFloat(expression[0]);
    for (let i = 1; i < expression.length; i += 2) {
      const op = expression[i];
      const val = parseFloat(expression[i + 1]);
      switch (op) {
        case "+":
          result += val;
          break;
        case "-":
          result -= val;
          break;
        case "*":
          result *= val;
          break;
        case "/":
          if (val === 0) {
            this.setState({
              inputValue: "Error: Division by Zero",
              expression: [],
            });
            return;
          }
          result /= val;
          break;
        default:
          break;
      }
    }
    this.setState({
      inputValue: result.toString(),
      expression: [result],
      isCalculated: true,
    });
  };

  handleClear = () => {
    this.setState({
      inputValue: "0",
      expression: [],
      isCalculated: false,
    });
  };

  handleBackspace = () => {
    this.setState({
      inputValue: this.state.inputValue.slice(0, -1) || "0",
    });
  };

  handleDecimal = () => {
    const { inputValue, expression } = this.state;
    if (!inputValue.includes(".")) {
      if (
        typeof expression[expression.length - 1] === "string" &&
        !isNaN(expression[expression.length - 1])
      ) {
        const newNumber = expression[expression.length - 1] + ".";
        this.setState({
          expression: [...expression.slice(0, -1), newNumber],
          inputValue: newNumber,
        });
      } else {
        this.setState({
          expression: [...expression, "0."],
          inputValue: "0.",
        });
      }
    }
  };



  render() {
    return (
      <div className="calculator">
        <Display value={this.state.inputValue} />
        <Keypad
          handleButtonClick={this.handleButtonClick}
          handleClear={this.handleClear}
          handleDecimal={this.handleDecimal}
        />
      </div>
    );
  }
}
