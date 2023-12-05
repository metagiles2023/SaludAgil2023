import { useSession } from "next-auth/react";
import React, { useState } from "react";

export const Register = (props) => {
    // Manejo usuarios
    const { data: session } = useSession()
    
    // No esta bien que sean useState todos. No pasa nada.
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState(''); //Ignorada
    const [nombre, setNombre] = useState('');
    const [dni, setDNI] = useState('');
    const [apellido, setApellido] = useState('');
    const [obraSocial, setObraSocial] = useState('');
    const [textoBackend, setTextoBackend] = useState('');
    
    function clearForm() {
        setEmail('')
        setPass('')
        setNombre('')
        setDNI('')
        setApellido('')
        setObraSocial('')
    }
    //TODO: mensajes de error

    const handleSubmit = (e) => {
        const user = session?.user
        const token = user && user.token ? user.token : "no-token-for-registro"
        e.preventDefault();
        console.log(email);
        //console.log(e.target)
        const formData = {
            nombre: e.target.nombre.value,
            apellido: e.target.apellido.value,
            dni: e.target.dni.value,
            obraSocial: e.target.obraSocial.value,
            email: e.target.email.value
        }
        console.log(formData)
        fetch('/api/paciente/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                other: formData,
                token: token
            })
        })
            .then(async (response) => {
                console.log('ha llegado la respuesta de the api del front');
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
            <h2 style={{fontSize: '40px' , fontWeight: 'bold'}}>REGISTER</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="nombre" style={{ fontSize: '23px' }}>Nombre</label>
            <input value={nombre} name="nombre" onChange={(e) => setNombre(e.target.value)} id="nombre" placeholder="Nombre" style={{color: 'black'}} />
            <label htmlFor="Apellido" style={{ fontSize: '23px' }}>Apellido</label>
            <input value={apellido} name="Apellido" onChange={(e) => setApellido(e.target.value)} id="apellido" placeholder="Apellido" style={{color: 'black'}} />
            <label htmlFor="dni" style={{ fontSize: '23px' }}>Dni</label>
            <input value={dni} name="dni" onChange={(e) => setDNI(e.target.value)} id="dni" placeholder="43030405" style={{color: 'black'}}/>
            <label htmlFor="obraSocial" style={{ fontSize: '23px' }}>Obra Social</label>
            <input value={obraSocial} name="obraSocial" onChange={(e) => setObraSocial(e.target.value)} id="obraSocial" placeholder="OSDE,OMINT,... " style={{color: 'black'}} />
            <label htmlFor="email" style={{ fontSize: '23px' }}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" style={{color: 'black'}} />
            <label htmlFor="password" style={{ fontSize: '23px' }}>Contraseña</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" style={{color: 'black'}}/>
            <button type="submit" className="white-background">Registrar</button>
        </form>
        <label>{textoBackend}</label>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Ya tienes una cuenta? Inicia sesion aqui.</button>
    </div>
    )
}