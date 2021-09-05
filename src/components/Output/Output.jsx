import classes from './style/Output.module.scss'

function Output({currentOperand, operator, previousOperand}) {
    return (
        <div className={classes.output}>
            <div>{previousOperand} {operator}</div>
            <div>{currentOperand}</div>
        </div>
    )
}

export default Output;