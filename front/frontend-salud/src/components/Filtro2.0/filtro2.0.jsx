"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import ListaFichasMedicas from '../FichaMedica/FichaMedica';
import './filtro2.0.css'; 
const controller = new AbortController(); // Create an AbortController
const signal = controller.signal; // Get the signal from the controller

const FichasMedicasFiltradas = () => {
    const [filtroSeleccionado, setFiltroSeleccionado] = useState({
        "filtraEmergencia": false
    })
    const [datoFiltrado, setDatoFiltrado] = useState([]);//este se tiene que ir, las fichas ya estan filtradas
    const [fichasMedicas, setFichasMedicas] = useState([]);

    useEffect(() => {
        console.log('xd')
        // Make an HTTP GET request to your backend API
        fetch("/api/ficha-medica", {
                method: 'POST',
                body: JSON.stringify(filtroSeleccionado),
                headers: {
                    "Content-Type": "application/json"
                },
                signal: signal, // Provide the signal option
            })
            .then(async (response) => {
                const respuesta = await response.json()
                console.log(respuesta)
                setFichasMedicas(respuesta);
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    }, [filtroSeleccionado]); //cuando cambia el body, 
    const handleOnCheckbox = e => {
        setFiltroSeleccionado({
            ...filtroSeleccionado,[e.target.value]:e.target.checked,
        })
        if (e.target.checked){
            if(e.target.name == "Gravedad"){
                const resultadoFiltro = fichasMedicas.filter(item => item.esGrave.toString() === e.target.value)
            setDatoFiltrado ([
                ... datoFiltrado,
                ...resultadoFiltro
            ])
            }
            else if(e.target.name == "Emergencia"){
                const resultadoFiltro = fichasMedicas.filter(item => item.usoEmergencia.toString() === e.target.value)
                setDatoFiltrado ([
                    ... datoFiltrado,
                    ...resultadoFiltro
                ])
            }
            
        }
        else{
            if(e.target.name == "Gravedad"){
                const resultadoFiltro = datoFiltrado.filter(item => item.esGrave.toString() !== e.target.value)
            setDatoFiltrado ([...resultadoFiltro])
            }
            else if(e.target.name == "Emergencia"){
                const resultadoFiltro = datoFiltrado.filter(item => item.usoEmergencia.toString() !== e.target.value)
                setDatoFiltrado ([...resultadoFiltro])
            }

            
        }
        console.log(datoFiltrado)
    }
    return(
        <div>
            <div className = 'checkbox-container'> 
                <h2> Gravedad </h2>
                <div className='input-checkbox'>
                    <input onChange={handleOnCheckbox} type='checkbox' name='Gravedad' value= 'true' id='Gravedad' />
                    <label htmlFor='si'> Grave </label>
                </div>
                <div className='input-checkbox'>
                    <input onChange={handleOnCheckbox} type='checkbox' name='Gravedad' value='false' id='Leve' />
                    <label htmlFor='no'> Leve </label>
                </div> 

                <h2> Servicio de Emergencia</h2>
                <div className='input-checkbox'>
                    <input onChange={handleOnCheckbox} type='checkbox' name='Emergencia' value= 'true' id='Servicio de emergencia' />
                    <label htmlFor='si'> Si </label>
                </div>
                <div className='input-checkbox'>
                    <input onChange={handleOnCheckbox} type='checkbox' name='Emergencia' value='false' id='Servicio de emergencia' />
                    <label htmlFor='no'> No </label>
                </div> 
            </div>
        
            <div >
            <ListaFichasMedicas fichasMedicas={fichasMedicas} />
            </div>
        </div>
    );

}

export default FichasMedicasFiltradas;