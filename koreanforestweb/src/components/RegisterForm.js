import React from 'react'
import styles from '../styles/RegisterForm.module.scss'
import Router from 'next/router'

export default function RegisterForm(props, ref) {

    async function handleSubmit(event) {
        event.preventDefault()

        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
            username: event.target.username.value
        }
        const JSONdata = JSON.stringify(data)
        const endpoint = 'http://localhost:3080/register' //
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
        } catch(e) {
            console.error(e)
        }
        if (response.ok) {
            const result = await response.json()
            localStorage.setItem('userid', result)
            Router.push('/login')
        }
    }

    return (
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            <label htmlFor="email" className={styles.registerLabel}>Email:</label>
            <input type="email" className={styles.registerInput} name="email" placeholder="Type your email here!"></input>

            <label htmlFor="password" className={styles.registerLabel}>Password:</label>
            <input type="password" className={styles.registerInput} name="password" placeholder="Type your password here!"></input>

            <label htmlFor="username" className={styles.registerLabel}>Username:</label>
            <input type="text" className={styles.registerInput} name="username" placeholder="Type your username here!"></input>

            <button type="submit" className={styles.registerButton}>Register</button>
        </form>
    )
}

