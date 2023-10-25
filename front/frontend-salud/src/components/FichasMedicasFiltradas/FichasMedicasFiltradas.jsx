"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import ListaFichasMedicas from '../FichaMedica/FichaMedica';
import './FichasMedicasFiltradas.css'; 
const controller = new AbortController(); // Create an AbortController
const signal = controller.signal; // Get the signal from the controller

const FichasMedicasFiltradas = () => {
    const [filtroSeleccionado, setFiltroSeleccionado] = useState({
        //"filtraEmergencia": true
        
    })
    console.log(filtroSeleccionado)
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
                console.log(filtroSeleccionado)
                console.log(respuesta)
                setFichasMedicas(respuesta);
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    }, [filtroSeleccionado]); //cuando cambia el body, 
    const handleOnCheckbox = e => {
        if(e.target.checked){
            if(e.target.name == "Emergencia"){
                    if("filtraEmergencia" in filtroSeleccionado){
                        delete filtroSeleccionado.filtraEmergencia
                        const nuevoFiltro = {}
                        setFiltroSeleccionado(
                        {...filtroSeleccionado, ...nuevoFiltro}
                        )
                    } else{
                        console.log(e.target.value)
                        if(e.target.value == 'true'){
                            const nuevoFiltro = {"filtraEmergencia": true}
                             setFiltroSeleccionado(
                            {...filtroSeleccionado, ...nuevoFiltro},
                            )
                        }else{
                            const nuevoFiltro = {"filtraEmergencia": false}
                             setFiltroSeleccionado(
                            {...filtroSeleccionado, ...nuevoFiltro},
                            )
                        }             
                    }
                }
            if(e.target.name == "Gravedad"){
               
                if("filtraGrave" in filtroSeleccionado){
                    delete filtroSeleccionado.filtraGrave
                    const nuevoFiltro = {}
                    setFiltroSeleccionado(
                    {...filtroSeleccionado, ...nuevoFiltro}
                    )
                } else{
                    if(e.target.value == 'true'){
                        const nuevoFiltro = {"filtraGrave": true}
                         setFiltroSeleccionado(
                        {...filtroSeleccionado, ...nuevoFiltro},
                        )
                    }else{
                        const nuevoFiltro = {"filtraGrave": false}
                         setFiltroSeleccionado(
                        {...filtroSeleccionado, ...nuevoFiltro},
                        )
                    } 
                }
            }            
            console.log("filtro sleccionado"+ filtroSeleccionado)
        }else{
            if(e.target.name == "Emergencia"){
                if (!("filtraEmergencia" in filtroSeleccionado)){
                    if (e.target.value == 'true'){
                        const nuevoFiltro = {"filtraEmergencia": false}
                             setFiltroSeleccionado(
                            {...filtroSeleccionado, ...nuevoFiltro}
                             )
                    }
                    else {
                        const nuevoFiltro = {"filtraEmergencia": true}
                             setFiltroSeleccionado(
                            {...filtroSeleccionado, ...nuevoFiltro}
                             )
                    }
                }
                else{
                    delete filtroSeleccionado.filtraEmergencia
                const nuevoFiltro = {}
                setFiltroSeleccionado(
                    {...filtroSeleccionado, ...nuevoFiltro}
                )
                }
            }
            if(e.target.name == "Gravedad"){
                if (!("filtraGrave" in filtroSeleccionado)){
                    if (e.target.value == 'true'){
                        const nuevoFiltro = {"filtraGrave": false}
                             setFiltroSeleccionado(
                            {...filtroSeleccionado, ...nuevoFiltro}
                             )
                    }
                    else {
                        const nuevoFiltro = {"filtraGrave": true}
                             setFiltroSeleccionado(
                            {...filtroSeleccionado, ...nuevoFiltro}
                             )
                    }
                }
                else{
                    delete filtroSeleccionado.filtraGrave
                const nuevoFiltro = {}
                setFiltroSeleccionado(
                    {...filtroSeleccionado, ...nuevoFiltro}
                )
                }
                
            }
            
        }
        
        

        /*
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

            
        } */
        
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
            <ListaFichasMedicas fichasMedicas={Array.from(fichasMedicas)} />
            </div>
        </div>
    );

}

export default FichasMedicasFiltradas;