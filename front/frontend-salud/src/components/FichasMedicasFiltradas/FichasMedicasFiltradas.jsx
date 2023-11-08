"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import ListaFichasMedicas from '../FichaMedica/FichaMedica';
import './FichasMedicasFiltradas.css'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Selector from '../Selector/Selector';
const controller = new AbortController(); // Create an AbortController
const signal = controller.signal; // Get the signal from the controller


const FichasMedicasFiltradas = () => {

    //se inicializa el filtro vacio para traer todas las fichas
    const [filtroSeleccionado, setFiltroSeleccionado] = useState({})

    const [fichasMedicas, setFichasMedicas] = useState([]); 
    const [startDate, setStartDate] = useState(new Date()); 
    const [toDate, setToDate] = useState(new Date());
    const [ultiPaciente, setUltiPaciente] = useState(null);
    const [ultiMedico, setUltiMedico] = useState(null);


    useEffect(() => {
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
                setFichasMedicas(respuesta);
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    }, [filtroSeleccionado]); //cuando cambia el body,

    const reiniciar = () => {
        if ("fechaDesde" in filtroSeleccionado){
            delete filtroSeleccionado.fechaDesde;
        }
        if ("fechaHasta" in filtroSeleccionado){
            delete filtroSeleccionado.fechaHasta;
        }
        const nuevoFiltro = {};
        setFiltroSeleccionado(
            {...filtroSeleccionado, ...nuevoFiltro}
        )
    }

    const dateForHandle = (fecha) => {
        setStartDate(fecha);
        const nuevoFiltro = {"fechaDesde": fecha};
        setFiltroSeleccionado(
            {...filtroSeleccionado, ...nuevoFiltro}
        )
    }

    const dateToHandle = (fecha) => {
        setToDate(fecha);
        const nuevoFiltro = {"fechaHasta": fecha};
        setFiltroSeleccionado(
            {...filtroSeleccionado, ...nuevoFiltro}
        )
    }

    const handleFiltrarMedico = (optionSelected) => {
        if (ultiMedico && ultiMedico.idUsuario === optionSelected.idUsuario){
            if ("medico" in filtroSeleccionado){
                delete filtroSeleccionado.medico;
                const nuevoFiltro = {}
                setFiltroSeleccionado(
                    {...filtroSeleccionado, ...nuevoFiltro}
                )}
        }else {
            const nuevoFiltro = {"medico": optionSelected.idUsuario};
            setFiltroSeleccionado(
                {...filtroSeleccionado, ...nuevoFiltro}
            )}
        setUltiMedico(optionSelected);
    }
    
    const handleFiltrarPaciente = (optionSelected) => {
        if (ultiPaciente && ultiPaciente.idUsuario === optionSelected.idUsuario){
            if ("paciente" in filtroSeleccionado){
                delete filtroSeleccionado.paciente;
                const nuevoFiltro = {}
                setFiltroSeleccionado(
                    {...filtroSeleccionado, ...nuevoFiltro}
                )}
        }else {
            const nuevoFiltro = {"paciente": optionSelected.idUsuario};
            setFiltroSeleccionado(
                {...filtroSeleccionado, ...nuevoFiltro}
            )}
        setUltiPaciente(optionSelected);
    }

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
    }
    return(
        <div>
            <div className = 'checkbox-container mt-5 ml-10 text-xl'> 
                <h2 className='font-bold text-2xl'> Gravedad </h2>
                <div className='input-checkbox'>
                    <input onChange={handleOnCheckbox} type='checkbox' name='Gravedad' value= 'true' id='Gravedad' />
                    <label htmlFor='si'> Grave </label>
                </div>
                <div className='input-checkbox'>
                    <input onChange={handleOnCheckbox} type='checkbox' name='Gravedad' value='false' id='Leve' />
                    <label htmlFor='no'> Leve </label>
                </div> 
                <h2 className='font-bold text-2xl'> Servicio de Emergencia</h2>
                <div className='input-checkbox'>
                    <input onChange={handleOnCheckbox} type='checkbox' name='Emergencia' value= 'true' id='Servicio de emergencia' />
                    <label htmlFor='si'> Si </label>
                </div>
                <div className='input-checkbox'>
                    <input onChange={handleOnCheckbox} type='checkbox' name='Emergencia' value='false' id='Servicio de emergencia' />
                    <label htmlFor='no'> No </label>
                </div>
                <h2 className='font-bold text-2xl'> Fecha Desde</h2>
                <DatePicker dateFormat='yyyy/MM/dd' selected={startDate} onChange={(date) => dateForHandle(date)} />
                <h2 className='font-bold text-2xl'> Fecha Hasta</h2>
                <DatePicker dateFormat='yyyy/MM/dd' selected={toDate} onChange={(date) => dateToHandle(date)} />
                <div>
                    <button  style={{
                        backgroundColor: '#008080', // Color de fondo
                        color: 'white',             // Color del texto
                        padding: '10px 20px',       // Relleno (padding)
                        border: 'none',            // Borde
                        borderRadius: '5px',        // Radio de borde
                        cursor: 'pointer',         // Cursor de puntero
                        fontSize: '16px',           // Tamaño de fuente
                        transition: 'backgroundColor 0.3s' }} id="miBoton" className="boton-personalizado" onClick={reiniciar}>Reiniciar Fecha</button>
                </div>
                <div>
                    <Selector onSelectOption={handleFiltrarMedico} usuarios={"medico"} />
                </div>
                <div>
                    <Selector onSelectOption={handleFiltrarPaciente} usuarios={"paciente"} />
                </div>
            </div>
            <div >
                <ListaFichasMedicas fichasMedicas= {fichasMedicas} />
            </div>
        </div>
    );

}

export default FichasMedicasFiltradas;