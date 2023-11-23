import React, { useState } from "react";

export const Login = (props) => {
    const [DNI, setDNI] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2 style={{ fontSize: '40px' , fontWeight: 'bold'}}>LOGIN</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="DNI" style={{ fontSize: '23px' }}>Dni</label>
                <input value={DNI} onChange={(e) => setDNI(e.target.value)}type="DNI" placeholder="43040506" id="DNI" name="DNI" style={{color: 'black'}} />
                <label htmlFor="password" style={{ fontSize: '23px' }}>Contraseña</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" style={{color: 'black'}} />
                <button type="submit" className="white-background">Login</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>No tienes una cuenta? Registrate aqui.</button>
        </div>
    )
}