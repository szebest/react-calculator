import {useState} from 'react'
import classes from './style/Calculator.module.scss'

function Calculator() {
    const [previousOperand, setPreviousOperand] = useState("")
    const [operation, setOperation] = useState("")
    const [currentOperand, setCurrentOperand] = useState("")

    return (
        <div className={classes.calculator}>

        </div>
    )
}

export default Calculator;