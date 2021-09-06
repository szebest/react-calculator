import classes from './style/Button.module.scss'

function Button({span_two, operator, callback_function}) {
    if (!callback_function)
        callback_function = () => {};
    return (
        <div className={`${classes.button}${span_two ? " " + classes.span_two : ""}`}>
            <button onClick={() => {callback_function(operator)}}>{operator}</button>
        </div>
    )
}

export default Button;