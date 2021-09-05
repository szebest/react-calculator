import {useState} from 'react'
import classes from './style/Calculator.module.scss'

import Output from '../Output/Output.jsx';
import Button from '../Button/Button.jsx';

function Calculator() {
    const [previousOperand, setPreviousOperand] = useState("")
    const [operator, setOperator] = useState("")
    const [currentOperand, setCurrentOperand] = useState("0")

    function toFixed(x) {
        if (Math.abs(x) < 1.0) {
          var e = parseInt(x.toString().split('e-')[1]);
          if (e) {
              x *= Math.pow(10,e-1);
              x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
          }
        } else {
          var e = parseInt(x.toString().split('+')[1]);
          if (e > 20) {
              e -= 20;
              x /= Math.pow(10,e);
              x += (new Array(e+1)).join('0');
          }
        }
        return x;
      }

    const onClickNumber = (number) => {
        if (number !== ".") {
            if (currentOperand === "0")
                setCurrentOperand(number)
            else
                setCurrentOperand(prev => prev + number)
        }
        else if (![...currentOperand].some((char) => char === '.')) 
            setCurrentOperand(prev => prev + number)
    }

    const onClickOperator = (op) => {
        switch (op) {
            case "AC": {
                setCurrentOperand("0")
                setOperator("")
                setPreviousOperand("")
            } break
            case "DEL": {
                setCurrentOperand(prev => {
                    const substr = prev.substring(0, prev.length - 1)
                    return substr.length > 0 ? substr : "0"
                })
            } break
            case "÷": 
            case "*": 
            case "+": 
            case "-": {
                if (operator === "") {
                    setPreviousOperand(currentOperand)
                    setOperator(op)
                    setCurrentOperand("0")
                }
                else {
                    setOperator(operator)
                }
            } break
            case "=": {
                let result;
                switch (operator) {
                    case "÷": {
                        result = parseFloat(previousOperand) / parseFloat(currentOperand)
                    } break;
                    case "*": {
                        result = parseFloat(previousOperand) * parseFloat(currentOperand)
                    } break;
                    case "+": {
                        result = parseFloat(previousOperand) + parseFloat(currentOperand)
                    } break;
                    case "-": {
                        result = parseFloat(previousOperand) - parseFloat(currentOperand)
                    } break;
                }
                setPreviousOperand("")
                setOperator("")
                setCurrentOperand(toFixed(result).toString())
            } break
        }
    }

    return (
        <div className={classes.calculator}>
            <Output currentOperand={currentOperand} previousOperand={previousOperand} operator={operator}/>
            <Button span_two operator="AC" callback_function={onClickOperator}/>
            <Button operator="DEL" callback_function={onClickOperator}/>
            <Button operator="÷" callback_function={onClickOperator}/>
            <Button operator="1" callback_function={onClickNumber}/>
            <Button operator="2" callback_function={onClickNumber}/>
            <Button operator="3" callback_function={onClickNumber}/>
            <Button operator="*" callback_function={onClickOperator}/>
            <Button operator="4" callback_function={onClickNumber}/>
            <Button operator="5" callback_function={onClickNumber}/>
            <Button operator="6" callback_function={onClickNumber}/>
            <Button operator="+" callback_function={onClickOperator}/>
            <Button operator="7" callback_function={onClickNumber}/>
            <Button operator="8" callback_function={onClickNumber}/>
            <Button operator="9" callback_function={onClickNumber}/>
            <Button operator="-" callback_function={onClickOperator}/>
            <Button operator="." callback_function={onClickNumber}/>
            <Button operator="0" callback_function={onClickNumber}/>
            <Button span_two operator="=" callback_function={onClickOperator}/>
        </div>
    )
}

export default Calculator;