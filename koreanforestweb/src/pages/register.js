import React, { useRef } from "react";
import DarkModeToggleButton from "../components/DarkModeToggleButton";
import RegisterForm from "../components/RegisterForm";

export default function login() {

    return (
        <>
            <h2>어숲    </h2>
            <DarkModeToggleButton />
            <RegisterForm />
        </>
    )
}