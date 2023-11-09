"use client"
import React, { useEffect } from 'react';
import './fichaMedica.css'; 




const ListaFichasMedicas = ({ fichasMedicas, pacientes, medicos }) => {

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
                    {fichasMedicas.map((fila) => {
                        const indexMedico = medicos.findIndex((item) => item.idUsuario === fila.medico)
                        const medico = medicos[indexMedico]
                        const indexPaciente = pacientes.findIndex((item) => item.idUsuario === fila.paciente)
                        const paciente = pacientes[indexPaciente]
                        const nombreCompletoMedico = `${medico.apellido}, ${medico.nombre} (${medico.dni})`
                        const nombreCompletoPaciente = `${paciente.apellido}, ${paciente.nombre} (${paciente.dni})`
                        return (    
                            <tr key={fila.idFichaMedica}>
                                <td>{fila.idFichaMedica}</td>
                                <td>{nombreCompletoMedico}</td>
                                <td>{nombreCompletoPaciente}</td>
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