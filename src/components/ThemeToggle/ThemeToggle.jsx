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
    }, [])

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
        <div className={classes.themeToggle} onClick={handleClick}>
            <a href="#0">{theme}</a>
            <input type="checkbox" id="switch" name="theme" disabled checked={theme === "dark" ? true : false}/>
            <label htmlFor="switch">Toggle</label>
        </div>
    )
}

export default ThemeToggle;