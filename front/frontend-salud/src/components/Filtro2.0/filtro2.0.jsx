"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import ListaFichasMedicas from '../FichaMedica/FichaMedica';
import './filtro2.0.css'; 

export default function Example(){
    const [filtroSeleccionado, setFiltroSeleccionado] = useState({
        Gravedad: false,
        Leve: false,
    })
    const [datoFiltrado, setDatoFiltrado] = useState([]);
    const [fichasMedicas, setFichasMedicas] = useState([]);

    useEffect(() => {
    console.log('xd')
    // Make an HTTP GET request to your backend API
    fetch("/api/ficha-medica", {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
        // Update the fichaMedica state with the data from the backend
        setFichasMedicas(data);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
    }, []);
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
                    <label htmlfor='si'> Grave </label>
                </div>
                <div className='input-checkbox'>
                    <input onChange={handleOnCheckbox} type='checkbox' name='Gravedad' value='false' id='Leve' />
                    <label htmlfor='no'> Leve </label>
                </div> 

                <h2> Servicio de Emergencia</h2>
                <div className='input-checkbox'>
                    <input onChange={handleOnCheckbox} type='checkbox' name='Emergencia' value= 'true' id='Servicio de emergencia' />
                    <label htmlfor='si'> Si </label>
                </div>
                <div className='input-checkbox'>
                    <input onChange={handleOnCheckbox} type='checkbox' name='Emergencia' value='false' id='Servicio de emergencia' />
                    <label htmlfor='no'> No </label>
                </div> 
            </div>
        
            <div >
            <ListaFichasMedicas fichasMedicas={datoFiltrado} />
            </div>
        </div>
    );

}