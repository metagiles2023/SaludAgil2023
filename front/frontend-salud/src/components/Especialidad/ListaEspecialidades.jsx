import React from 'react';
import './especialidades.css'; 

const ListaEspecialidades = ({ especialidades }) => {
    console.log('me llegaron las especialidades: ' + especialidades)
    return (
    <div className="especialidadTable">
        <table>
        <thead>
            <tr>
                <th>Nombre Especialidad</th>
                <th>Descripcion</th>
            </tr>
        </thead>
        <tbody>
            {especialidades.map((fila) => (
            <tr key={fila.idEspecialidad}>
                <td>{fila.nombre}</td>
                <td>{fila.descripcion}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
    };

export default ListaEspecialidades;