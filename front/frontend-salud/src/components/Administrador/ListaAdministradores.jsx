import React from 'react';
import './admin.css'; 

const ListaAdministradores = ({ administradores }) => {
    return (
    <div className="adminTable text-black" style={{ "backgroundColor": "white" }}>
        <table>
        <thead>
            <tr>
            <th>Id</th>
            <th>DNI</th>
            <th>Apellido</th>
            <th>Nombre</th>
            </tr>
        </thead>
        <tbody>
            {administradores && administradores.map && administradores.map((fila) => (
            <tr key={fila.idUsuario}>
                <td>{fila.idUsuario}</td>
                <td>{fila.dni}</td>
                <td>{fila.apellido}</td>
                <td>{fila.nombre}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
    };

export default ListaAdministradores;