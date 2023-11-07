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

    datos.forEach( item => {
    const mes = new Date(item.date).getMonth();
    salida[mes]++;

    })
    return salida;
}

const GraficoLineas = () => {

    const[chartData, setChartData] = useState({
        datasets: []
    });

    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const [filtro, setFiltro] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [fichasMedicas, setFichasMedicas] = useState([]);

    var casos = Array(12).fill(0);

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

        casos = contadorPorMes(fichasMedicas);

        setChartData({
            labels: meses,
            datasets: [
                {
                    label: 'CASOS',
                    data: casos,
                    tension: 0.5,
                    fill: true,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgb(255, 99, 132, 0.5)',
                    pointRadius: 5,
                    pointBorderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)'
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
                    text: "CASOS TOTALES POR MES"
                }
            },
            maintainAspectRatio: false,
            responsitive: true
        })

    }, [fichasMedicas] );

    var opciones = [];

    return <Line data={chartData} options={chartOptions} />
}

export default GraficoLineas;




