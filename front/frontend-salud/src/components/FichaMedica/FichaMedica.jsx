import React from 'react';
import './fichaMedica.css'; 

const FichaMedica = ({ fichaMedica }) => {
  return (
    <div className="fichaMedicaTable">
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
          {fichaMedica.map((fila) => (
            <tr key={fila.idFichaMedica}>
              <td>{fila.idFichaMedica}</td>
              <td>{fila.medico}</td>
              <td>{fila.paciente}</td>
              <td>{fila.date}</td>
              <td>{fila.diagnostico}</td>
              <td>{fila.esGrave}</td>
              <td>{fila.usoEmergencia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FichaMedica;