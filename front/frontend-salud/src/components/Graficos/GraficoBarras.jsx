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

    datos && datos.forEach && datos.forEach( item => {
    const mes = new Date(item.date).getMonth();
    salida[mes]++;

    })
    return salida;
}

const GraficoBarras = ({ data, labels}) => {

    const[chartData, setChartData] = useState({
        datasets: []
    });
    
    const [chartOptions, setChartOptions] = useState({});

    var countsGraves = Array(12).fill(0);
    var countsLeves = Array(12).fill(0);

    useEffect(() => {

        var graves = data.filter(item => item.esGrave === true);
        var leves = data.filter(item => item.esGrave === false);

        countsGraves = contadorPorMes(graves);
        countsLeves = contadorPorMes(leves);

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'GRAVES',
                    data: countsGraves,
                    borderColor: 'rgba(255, 117, 20, 1)',
                    backgroundColor: 'rgba(255, 117, 20, 1)'
                },
                {
                    label: 'LEVES',
                    data: countsLeves,
                    borderColor: 'rgba(173, 216, 230, 1)',
                    backgroundColor: 'rgba(173, 216, 230, 1)',
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

    }, [data]);
    
    return(
        <Bar data={chartData} options={chartOptions} /> 
    )

}

export default GraficoBarras;
