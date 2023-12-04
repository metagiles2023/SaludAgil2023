"use client"
import React, { useState, useEffect } from "react";
import { SessionProvider } from 'next-auth/react';
import { useSession, signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export const Login = (props) => {
    const { data: session } = useSession();
    const searchParams = useSearchParams();

    const [dni, setDNI] = useState('');
    const [pass, setPass] = useState(''); //Ignorada

    const [textoBackend, setTextoBackend] = useState('');
    //console.log(session)
    function clearForm() {
        setDNI('')
        setPass('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        console.log('pipipipi')
        console.log(data)
        const result = await signIn('credentials', {
            dni: data.get('dni'),
            password: "password",
        });
        
        clearForm()
    }
    

    return (
        <div className="auth-form-container">
            <h2 style={{ fontSize: '40px' , fontWeight: 'bold'}}>LOGIN</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="dni" style={{ fontSize: '23px' }}>DNI</label>
                <input value={dni} onChange={(e) => setDNI(e.target.value)}type="dni" placeholder="43040506" id="dni" name="dni" style={{color: 'black'}} />
                <label htmlFor="password" style={{ fontSize: '23px' }}>Contraseña</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" style={{color: 'black'}} />
                <button type="submit" className="white-background">Login</button>
            </form>
            <label>{textoBackend}</label>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>No tienes una cuenta? Registrate aqui.</button>
        </div>
    )
}