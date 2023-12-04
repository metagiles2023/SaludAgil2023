"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
const controller = new AbortController(); // Create an AbortController
const signal = controller.signal; // Get the signal from the controller


Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function contadorPorMes(datos) {

    var salida = Array(12).fill(0);

    datos && datos.forEach && datos.forEach( item => {
    const mes = new Date(item.date).getMonth();
    salida[mes]++;

    })
    return salida;
}

function contadorPorMedico(datos, medicos){

    const contadorFichasMap = {};
    var salida = [];

    //un mapa que por cada medico.id me de la cantidad de fichas medicas
    //["maria", "damian", "marcelo", "dr zunini"]
    //[0,1,3,5];

    medicos && medicos.forEach && medicos.forEach((medico) => {
        contadorFichasMap[medico.idUsuario] = 0;
    });

    datos && datos.forEach && datos.forEach((ficha) => {
        contadorFichasMap[ficha.medico]++;
    });

    salida = Object.values(contadorFichasMap);
    return salida;
    
}

function buscardorEspecialidad(id, medicos){

    var salida = medicos.filter(item => item.idUsuario === id);
    return (salida && salida.length > 0) ? salida[0].especialidad : "no-especialidad";
}

function contadorPorEspecialidad(datos, medicos){

    const contadorFichasMap = {};
    var salida = [];

    medicos && medicos.forEach && medicos.forEach((medico) => {
        contadorFichasMap[medico.especialidad] = 0;
    });

    datos && datos.forEach && datos.forEach((ficha) => {
        var identificador = ficha.medico;
        var especialidad = buscardorEspecialidad(identificador, medicos);
        contadorFichasMap[especialidad]++;
    });

    salida = Object.values(contadorFichasMap);
    return salida;
}

const GraficoLineas = ({ data, labels, tipo, medicos}) => {

    const[chartData, setChartData] = useState({
        datasets: []
    });

    const [chartOptions, setChartOptions] = useState({});

    var casos = Array(12).fill(0);
    
    //texto que va por encima del grafico
    var texto = "";

    useEffect(() => {

        if (tipo === "meses") {
            texto = "CASOS TOTALES POR MES";
            casos = contadorPorMes(data);
        } 

        if (tipo === "medicos") {
            texto = "TURNOS POR MEDICOS";
            casos = contadorPorMedico(data, medicos);
        }

        if (tipo === "especialidad"){
            texto = "TURNOS POR ESPECIALIDADES";
            casos = contadorPorEspecialidad(data, medicos); 
        }

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'CASOS',
                    data: casos,
                    tension: 0.5,
                    fill: true,
                    borderColor: 'rgba(255, 117, 20, 0.5)',
                    backgroundColor: 'rgba(255, 117, 20, 0.5)',
                    pointRadius: 5,
                    pointBorderColor: 'rgba(255, 117, 20, 1)',
                    pointBackgroundColor: 'rgba(255, 117, 20, 1)'
                }
            ]
        })

        setChartOptions({
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: texto 
                }
            },
            maintainAspectRatio: false,
            responsitive: true
        })

    }, [data] );

    return <Line data={chartData} options={chartOptions} />
}

export default GraficoLineas;




