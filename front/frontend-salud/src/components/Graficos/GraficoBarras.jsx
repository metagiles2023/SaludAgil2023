"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Newsreader } from 'next/font/google';
const controller = new AbortController(); // Create an AbortController
const signal = controller.signal; // Get the signal from the controller

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function contadorPorMes(datos) {

    var salida = Array(12).fill(0);

    datos.forEach( item => {
    const mes = new Date(item.date).getMonth();
    salida[mes]++;

    })
    return salida;
}

const GraficoBarras = () => {

    const[chartData, setChartData] = useState({
        datasets: []
    });

    //cargar fichas medicos sin filtro  
    const [filtro, setFiltro] = useState({})
    const [chartOptions, setChartOptions] = useState({});
    const [fichasMedicas, setFichasMedicas] = useState([]);

    var countsGraves = Array(12).fill(0);
    var countsLeves = Array(12).fill(0);

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

        var graves = fichasMedicas.filter(item => item.esGrave === true);
        var leves = fichasMedicas.filter(item => item.esGrave === false);

        countsGraves = contadorPorMes(graves);
        countsLeves = contadorPorMes(leves);

        setChartData({
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
                {
                    label: 'Graves',
                    data: countsGraves,
                    borderColor: 'rgb(255, 0, 0)',
                    backgroundColor: 'rgb(255, 0, 0, 0.4)'
                },
                {
                    label: 'Leves',
                    data: countsLeves,
                    borderColor: 'rgb(0, 0, 255)',
                    backgroundColor: 'rgb(0, 0, 255, 0.4)'
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
                    text: "GRAVEDAD DE LOS CASOS POR MES"
                }
            },
            maintainAspectRatio: false,
            responsitive: true
        })

    }, [fichasMedicas]);

    return(
        <Bar data={chartData} options={chartOptions} /> 
    )

}

export default GraficoBarras;
