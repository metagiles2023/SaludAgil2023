import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [DNI, setDNI] = useState('');
    const [Apellido, setApellido] = useState('');
    const [ObraSocial, setObraSocial] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2 style={{fontSize: '40px' , fontWeight: 'bold'}}>REGISTER</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name" style={{ fontSize: '23px' }}>Nombre</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Nombre" style={{color: 'black'}} />
            <label htmlFor="Apellido" style={{ fontSize: '23px' }}>Apellido</label>
            <input value={Apellido} name="Apellido" onChange={(e) => setApellido(e.target.value)} id="Apellido" placeholder="Apellido" style={{color: 'black'}} />
            <label htmlFor="DNI" style={{ fontSize: '23px' }}>Dni</label>
            <input value={DNI} name="DNI" onChange={(e) => setDNI(e.target.value)} id="DNI" placeholder="43030405" style={{color: 'black'}}/>
            <label htmlFor="DNI" style={{ fontSize: '23px' }}>Obra Social</label>
            <input value={ObraSocial} name="ObraSocial" onChange={(e) => setObraSocial(e.target.value)} id="ObraSocial" placeholder="OSDE,OMINT,... " style={{color: 'black'}} />
            <label htmlFor="email" style={{ fontSize: '23px' }}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" style={{color: 'black'}} />
            <label htmlFor="password" style={{ fontSize: '23px' }}>Contraseña</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" style={{color: 'black'}}/>
            <button type="submit" className="white-background">Login</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Ya tienes una cuenta? Inicia sesion aqui.</button>
    </div>
    )
}