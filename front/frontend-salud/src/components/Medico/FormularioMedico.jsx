import React, { useState } from 'react';
import './medico.css'; 

const FormularioMedico = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        especialidad: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Realizar la solicitud POST a la URL con formData
        const apiUrl = process.env.URL_BACKEND + "/medico/create"; // Reemplaza con la URL correcta
    
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
        // Manejar la respuesta si es necesario
            console.log('Respuesta:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="medicoCrearForm">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="dni">DNI:</label>
              <input
                type="text"
                id="dni"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="obraSocial">Obra Social:</label>
              <input
                type="text"
                id="especialidad"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Crear Medico</button>
          </form>
        </div>
      );
    };

export default FormularioMedico;