'use client'

import { LoginForm } from "./login-form/LoginForm"

export default function SignIn(){
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <LoginForm />
        </div>
    )
}