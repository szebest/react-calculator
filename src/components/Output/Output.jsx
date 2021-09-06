import classes from './style/Output.module.scss'

function Output({currentOperand, operator, previousOperand, error}) {
    return (
        <div className={classes.output}>
            <div className={classes.error}>{error}</div>
            <div>{previousOperand} {operator}</div>
            <div>{currentOperand}</div>
        </div>
    )
}

export default Output;