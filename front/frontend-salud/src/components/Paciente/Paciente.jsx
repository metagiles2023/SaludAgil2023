import React from 'react';
import './paciente.css'; 

const ListaPacientes = ({ pacientes }) => {
    return (
    <div className="pacienteTable text-black">
        <table>
        <thead>
            <tr>
            <th>Id</th>
            <th>DNI</th>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Obra Social</th>
            </tr>
        </thead>
        <tbody>
            {pacientes.map((fila) => (
            <tr key={fila.idUsuario}>
                <td>{fila.idUsuario}</td>
                <td>{fila.dni}</td>
                <td>{fila.apellido}</td>
                <td>{fila.nombre}</td>
                <td>{fila.obraSocial}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
    };

export default ListaPacientes;