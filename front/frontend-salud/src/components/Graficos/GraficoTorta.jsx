"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
const controller = new AbortController(); // Create an AbortController
const signal = controller.signal; // Get the signal from the controller

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const GraficoTorta = () => {

    const[chartData, setChartData] = useState({
        datasets: []
    });

    var niveles = ['Emergencia', 'Comun'];

    //cargar fichas medicos sin filtro  
    const [filtro, setFiltro] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [fichasMedicas, setFichasMedicas] = useState([]);

    var countsEmergencia = Array(2).fill(0);

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

        var emergencia = fichasMedicas.filter(item => item.usoEmergencia === true);
        
        countsEmergencia = Array(2).fill(0);
        countsEmergencia[0] = emergencia.length;
        countsEmergencia[1] = (fichasMedicas.length - countsEmergencia[0]); 

        console.log(countsEmergencia);


        setChartData({
            labels: niveles,
            datasets: [
                {
                    label: 'Servicio Emergencia',
                    data: countsEmergencia,
                    borderColor: 'rgb(255, 0, 0)',
                    backgroundColor: [
                        'rgba(255, 117, 20, 1)',
                        'rgba(173, 216, 230, 1)',
                    ],
                    borderColor: [
                        'rgba(155, 155, 155, 1)',
                        'rgba(155, 155, 155, 1)',
                    ],
                    borderWidth: 1,
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
                    text: "USO DEL SERVICIO DE EMERGENCIA"
                }
            },
            maintainAspectRatio: false,
            responsitive: true
        })

    }, [fichasMedicas]);

    return(
        <Pie data={chartData} options={chartOptions} />
    )
}

export default GraficoTorta;
