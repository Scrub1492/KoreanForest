import React, {useState} from 'react'
import styles from '../styles/RegisterForm.module.scss'
import Router from 'next/router'
export default function RegisterForm(props, ref) {
    
    const [incorrectLabel, setIncorrectLabel] = useState()

    async function handleSubmit(event) {
        event.preventDefault()
        
        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
        const JSONdata = JSON.stringify(data)
        const endpoint = 'http://localhost:3080/login' //
        const options = {
            mode: 'cors', //
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSONdata
        }

        try {
            var response = await fetch(endpoint, options)
            console.log(response)
        } catch(e) {
            console.error(e)
        }
        if (response.ok) {
            try {
            const result = await response.json()
            if (!result.authenticated) {
                setIncorrectLabel('Your Email or Password is incorrect')
                return
            }
            localStorage.setItem('userid', result.userId)
            return Router.push('/')
            } catch(e) {
                console.error(e)
            }
        }
    }

    return (
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            <label className={styles.registerLabel} id='incorrectLabel'>{incorrectLabel}</label>
            <label htmlFor="email" className={styles.registerLabel}>Email:</label>
            <input type="email" className={styles.registerInput} name="email" placeholder="Type your email here!"></input>

            <label htmlFor="password" className={styles.registerLabel}>Password:</label>
            <input type="password" className={styles.registerInput} name="password" placeholder="Type your password here!"></input>

            <button type="submit" className={styles.registerButton}>Login</button>
        </form>
    )
}

