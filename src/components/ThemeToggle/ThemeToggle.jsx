import {useState, useEffect} from 'react'
import classes from './style/ThemeToggle.module.scss'

function ThemeToggle() {
    const [theme, setTheme] = useState("light")

    const transition = () => {
        document.documentElement.classList.add('transition')
        window.setTimeout(() => {
            document.documentElement.classList.remove('transition')
        }, 600)
    }

    useEffect(() => {
        const localStorageTheme = localStorage.getItem('theme')
        if (localStorageTheme) {
            setTheme(localStorageTheme)
            document.documentElement.setAttribute('data-theme', localStorageTheme)
        }
    })

    const handleClick = () => {
        transition()

        if (theme === "light") {
            localStorage.setItem('theme', 'dark')
            document.documentElement.setAttribute('data-theme', 'dark')
            setTheme("dark")
        }
        else {
            localStorage.setItem('theme', 'light')
            document.documentElement.setAttribute('data-theme', 'light')
            setTheme("light")
        }
    }

    return (
        <div className={classes.themeToggle}>
            <a>{theme}</a>
            <input type="checkbox" id="switch" name="theme" onChange={handleClick} checked={theme === "dark" ? true : false}/>
            <label for="switch">Toggle</label>
        </div>
    )
}

export default ThemeToggle;