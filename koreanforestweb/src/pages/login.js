import React, { useRef } from "react";
import DarkModeToggleButton from "../components/DarkModeToggleButton";
import LoginForm from "../components/LoginForm";


export default function login() {

    return (
        <>
            <h2>어숲</h2>
            <DarkModeToggleButton />
            <LoginForm />
        </>
    )
}