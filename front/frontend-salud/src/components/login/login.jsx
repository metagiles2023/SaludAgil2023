import React, { useState } from "react";

export const Login = (props) => {
    const [dni, setDNI] = useState('');
    const [pass, setPass] = useState(''); //Ignorada

    const [textoBackend, setTextoBackend] = useState('');
    
    function clearForm() {
        setDNI('')
        setPass('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            dni: e.target.dni.value
        }
        console.log(formData)
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(async (response) => {
                console.log('ha llegado la respuesta de la api del front');
                console.log(response);
                const resp = response.json()
                console.log(`resp es ${resp}`)
                if (response.status >= 400) {
                    if (response.statusText) {
                        console.log('hay status text y es ' + response.statusText);
                        setTextoBackend(response.statusText);
                    }
                } else {
                    setTextoBackend(`Paciente creado con éxito!`);
                    clearForm();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="auth-form-container">
            <h2 style={{ fontSize: '40px' , fontWeight: 'bold'}}>LOGIN</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="dni" style={{ fontSize: '23px' }}>DNI</label>
                <input value={dni} onChange={(e) => setDNI(e.target.value)}type="dni" placeholder="43040506" id="dni" name="DNI" style={{color: 'black'}} />
                <label htmlFor="password" style={{ fontSize: '23px' }}>Contraseña</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" style={{color: 'black'}} />
                <button type="submit" className="white-background">Login</button>
            </form>
            <label>{textoBackend}</label>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>No tienes una cuenta? Registrate aqui.</button>
        </div>
    )
}