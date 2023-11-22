"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import GraficoBarras from './GraficoBarras';
import GraficoTorta from './GraficoTorta';
import GraficoLineas from './GraficoLineas';
const controller = new AbortController(); // Create an AbortController
const signal = controller.signal; // Get the signal from the controller

const Graficos = () => {

    //cargo las fichas medicas sin filtros
    const [filtro, setFiltro] = useState({});

    //aca van a estar todas las fichas medicas
    const [fichasMedicas, setFichasMedicas] = useState([]);

    //aca van a estar todos los medicos
    const [medicos, setMedicos] = useState([]);

    //aca van a estar todos los nombres de los medicos
    const [nombreMed, setNombreMed] = useState({});
    //aca van a estar todas las especialidades
    const [nombreEspe, setNombreEspe] = useState({});

    //arreglo que contiene los niveles para los labels de los graficos
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const niveles = ['Emergencia', 'Comun'];

    const [showLastComponent, setShowLastComponent] = useState(false);
    

    useEffect(() => {
        // Make an HTTP GET request to your backend API
        fetch("/api/ficha-medica", {
                method: 'POST',
                body: JSON.stringify(filtro),
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
    }, [filtro]);
    

    useEffect(() => {
        // Make an HTTP GET request to your backend API
        fetch("/api/medico", {
                method: 'GET',
                signal: signal, // Provide the signal option
            })
            .then(async (response) => {
                const respuesta = await response.json()
                setMedicos(respuesta);
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    }, []); // Al inicio

    useEffect(() => {

        const nombresMedicoMap = {};
        const especialidadMedicoMap = {};
        medicos.forEach((medico) => {
            nombresMedicoMap[medico.idUsuario] = `${medico.nombre} ${medico.apellido}`;
            especialidadMedicoMap[medico.especialidad] = `${medico.especialidad}`;
        });

        setNombreMed(nombresMedicoMap);
        setNombreEspe(especialidadMedicoMap);
    }, [medicos]);


    const nombresMedicoArreglo = Object.values(nombreMed);
    const nombresEspecialidadArreglo = Object.values(nombreEspe);
    
    useEffect(() => {
        setTimeout(() => {
            setShowLastComponent(true);
        }, 2000);

        return () => clearTimeout();
    }, [medicos]);

    const renderLastComponent = showLastComponent && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px", height:"230px", "backgroundColor": "white"}}>
                <GraficoLineas data={fichasMedicas} labels={nombresMedicoArreglo} tipo={"medicos"} medicos={medicos} />
            </div>
            <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px", height:"230px", "backgroundColor": "white"}}>
            <GraficoLineas data={fichasMedicas} labels={nombresEspecialidadArreglo} tipo={"especialidad"} medicos={medicos} />
            </div>
        </div>
    )


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px", height:"230px", "backgroundColor": "white"}}>
                    <GraficoBarras data={fichasMedicas} labels={meses} />
                </div>
                <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px", height:"230px", "backgroundColor": "white"}}>
                    <GraficoLineas data={fichasMedicas} labels={meses} tipo={"meses"} medicos={medicos} />
                </div>
                <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width:"450px", height:"230px", "backgroundColor": "white"}}>
                    <GraficoTorta data={fichasMedicas} labels={niveles} />
                </div>
            </div>
            {renderLastComponent}
        </div>
    )

}

export default Graficos;