import React from 'react';
import './usuario.css'; 

const ListaUsuarios = ({ usuarios }) => {
    return (
    <div className="usuarioTable text-black" style={{ "backgroundColor": "white" }} >
        <table>
        <thead>
            <tr>
            <th>Id</th>
            <th>Rol</th>
            <th>DNI</th>
            <th>Apellido</th>
            <th>Nombre</th>
            </tr>
        </thead>
        <tbody>
            {usuarios && usuarios.map && usuarios.map((fila) => (
            <tr key={fila.idUsuario}>
                <td>{fila.idUsuario}</td>
                <td>{fila.rol}</td>
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

export default ListaUsuarios;