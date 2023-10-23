import React from 'react';
import './medico.css'; 

const ListaMedicos = ({ medicos }) => {
    return (
    <div className="medicoTable">
        <table>
        <thead>
            <tr>
            <th>Id</th>
            <th>DNI</th>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Especialidad</th>
            </tr>
        </thead>
        <tbody>
            {medicos.map((fila) => (
            <tr key={fila.idUsuario}>
                <td>{fila.idUsuario}</td>
                <td>{fila.dni}</td>
                <td>{fila.apellido}</td>
                <td>{fila.nombre}</td>
                <td>{fila.especialidad}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
    };

export default ListaMedicos;