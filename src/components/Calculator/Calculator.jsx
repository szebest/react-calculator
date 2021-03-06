import {useState, useEffect} from 'react'
import classes from './style/Calculator.module.scss'

import Output from '../Output/Output.jsx';
import Button from '../Button/Button.jsx';

function Calculator() {
    const [previousOperand, setPreviousOperand] = useState("")
    const [operator, setOperator] = useState("")
    const [currentOperand, setCurrentOperand] = useState("0")
    const [lastWasEqualSign, setLastWasEqualSign] = useState(false);
    const [error, setError] = useState("")

    const onKeyPressed = (e) => {
        if (e.keyCode >= 96 && e.keyCode <= 105)
            onClickNumber((e.keyCode - 96).toString())
        else if (e.keyCode === 190)
            onClickNumber(".")
        else if (e.keyCode === 107)
            onClickOperator("+")
        else if (e.keyCode === 109)
            onClickOperator("-")
        else if (e.keyCode === 106)
            onClickOperator("*")
        else if (e.keyCode === 111)
            onClickOperator("÷")
        else if (e.keyCode === 46)
            onClickOperator("AC")
        else if (e.keyCode === 8)
            onClickOperator("DEL")
        else if (e.keyCode === 13 || e.keyCode === 187)
            onClickOperator("=")
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyPressed)

        return () => {
            document.removeEventListener("keydown", onKeyPressed)
        }
    })

    useEffect(() => {
        if (error !== "")
            var timeoutID = setTimeout(() => {
                setError("")
            }, 2000)

        return () => {
            clearTimeout(timeoutID)
        }
    }, [error])

    const toFixed = (x) => {
        if (Math.abs(x) < 1.0) {
            let e = parseInt(x.toString().split('e-')[1])
            if (e) {
                x *= Math.pow(10, e - 1)
                x = '0.' + (new Array(e)).join('0') + x.toString().substring(2)
            }
        } else {
            let e = parseInt(x.toString().split('+')[1])
            if (e > 20) {
                e -= 20
                x /= Math.pow(10, e)
                x += (new Array(e + 1)).join('0')
            }
        }
        return x;
    }

    const onClickNumber = (number) => {
        if (number !== ".") {
            if (currentOperand === "0" || lastWasEqualSign)
                setCurrentOperand(number)
            else {
                let arr = currentOperand.split('.')
                if (arr[0].length < 10 || (arr.length > 1 && arr[1].length < 10))
                    setCurrentOperand(prev => prev + number)
                else {
                    if (arr.length > 1)
                        setError("You can only have up to 10 numbers after the decimal point")
                    else
                        setError("You can only have up to 10 numbers before the decimal point")
                }
            }
        }
        else if (![...currentOperand].some((char) => char === '.')) 
            setCurrentOperand(prev => prev + number)
        
        setLastWasEqualSign(false)
    }

    const onClickOperator = (op) => {
        setLastWasEqualSign(false)
        switch (op) {
            case "AC": 
                setCurrentOperand("0")
                setOperator("")
                setPreviousOperand("")
                break
            case "DEL": 
                setCurrentOperand(prev => {
                    const substr = prev.substring(0, prev.length - 1)
                    return substr.length > 0 ? substr : "0"
                })
                break
            case "÷": 
            case "*": 
            case "+": 
            case "-": 
                if (operator === "") {
                    setPreviousOperand(currentOperand)
                    setOperator(op)
                    setCurrentOperand("0")
                }
                else {
                    setOperator(op)
                }
                break
            case "=":
                if (operator === "")
                    break
                let result;
                switch (operator) {
                    case "÷":
                        result = parseFloat(previousOperand) / parseFloat(currentOperand)
                        if (isNaN(result)) {
                            result = 0
                            setError("Cannot divide by 0")
                        }
                        break
                    case "*":
                        result = parseFloat(previousOperand) * parseFloat(currentOperand)
                        break
                    case "+":
                        result = parseFloat(previousOperand) + parseFloat(currentOperand)
                        break
                    case "-":
                        result = parseFloat(previousOperand) - parseFloat(currentOperand)
                        break
                    default:
                        setError("Unknown operation sign")
                        break
                }
                setPreviousOperand("")
                setOperator("")
                setCurrentOperand(toFixed(result).toString())
                setLastWasEqualSign(true)
                break
            default:
                setError("Unknown operator")
                break
        }
    }

    return (
        <div className={classes.calculator}>
            <Output currentOperand={currentOperand} previousOperand={previousOperand} operator={operator} error={error}/>
            <Button span_two operator="DEL" callback_function={onClickOperator}/>
            <Button operator="AC" callback_function={onClickOperator}/>
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