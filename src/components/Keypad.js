import React from "react";
import Button from "./Button";

export default function Keypad({handleButtonClick, handleClear, handleDecimal}) {
    return (
        <div className="keypad">
            <Button id="clear" className="clear" onClick={handleClear} value="C" clear={true}>
                C
            </Button>
            <Button id="backspace" onClick={handleButtonClick} value="←">
                &larr;
            </Button>
            <Button id="percentage" onClick={handleButtonClick} value="%">
                %
            </Button>
            <Button id="divide" onClick={handleButtonClick} value="/">
                /
            </Button>
            <Button id="seven" onClick={handleButtonClick} value="7">
                7
            </Button>
            <Button id="eight" onClick={handleButtonClick} value="8">
                8
            </Button>
            <Button id="nine" onClick={handleButtonClick} value="9">
                9
            </Button>
            <Button id="multiply" onClick={handleButtonClick} value="*">
                *
            </Button>
            <Button id="four" onClick={handleButtonClick} value="4">
                4
            </Button>
            <Button id="five" onClick={handleButtonClick} value="5">
                5
            </Button>
            <Button id="six" onClick={handleButtonClick} value="6">
                6
            </Button>
            <Button id="subtract" onClick={handleButtonClick} value="-">
                -
            </Button>
            <Button id="one" onClick={handleButtonClick} value="1">
                1
            </Button>
            <Button id="two" onClick={handleButtonClick} value="2">
                2
            </Button>
            <Button id="three" onClick={handleButtonClick} value="3">
                3
            </Button>
            <Button id="add" onClick={handleButtonClick} value="+">
                +
            </Button>
            <Button id="zero" onClick={handleButtonClick} value="0">
                0
            </Button>
            <Button id="decimal" className="decimal" onClick={handleDecimal} value="." decimal={true}>
                .
            </Button>
            <Button id="equals" onClick={handleButtonClick} value="=">
                =
            </Button>

        </div>
    );
}