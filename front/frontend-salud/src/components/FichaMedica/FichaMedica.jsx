"use client"
import React, { useEffect, useState } from 'react';
import './fichaMedica.css'; 


const ListaFichasMedicas = ({ fichasMedicas, pacientes, medicos}) => {

    const [nombresMedicos, setNombresMedicos] = useState({});
    const [nombresPacientes, setNombresPacientes] = useState({});

    useEffect(() => {
    
        const nombresMedicosMap = {};
        medicos && medicos.forEach && medicos.forEach((medico) => {
            nombresMedicosMap[medico.idUsuario] = `${medico.nombre} ${medico.apellido}`;
        });

        setNombresMedicos(nombresMedicosMap);
    }, [medicos]);

    useEffect(() => {
    
        const nombresPacientesMap = {};
        pacientes && pacientes.forEach && pacientes.forEach((paciente) => {
            nombresPacientesMap[paciente.idUsuario] = `${paciente.nombre} ${paciente.apellido}`;
        });

        setNombresPacientes(nombresPacientesMap);
    }, [pacientes]);
    
    return (
        <div className='fichaMedicaTable' style={{ "backgroundColor": "white" }}>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Médico</th>
                        <th>Paciente</th>
                        <th>Fecha</th>
                        <th>Diagnóstico</th>
                        <th>Es Grave</th>
                        <th>Uso de Emergencia</th>
                    </tr>
                </thead>
                <tbody>
                    {fichasMedicas && fichasMedicas.map && fichasMedicas.map((fila) => {
                        const nombreMedico = nombresMedicos[fila.medico] || '';
                        const nombrePaciente = nombresPacientes[fila.paciente] || '';
                        return (    
                            <tr key={fila.idFichaMedica}>
                                <td>{fila.idFichaMedica}</td>
                                <td>{nombreMedico}</td>
                                <td>{nombrePaciente}</td>
                                <td>{fila.date}</td>
                                <td>{fila.diagnostico}</td>
                                <td>{fila.esGrave ? "Si" : "No"}</td>
                                <td>{fila.usoEmergencia ? "Si" : "No"}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ListaFichasMedicas;