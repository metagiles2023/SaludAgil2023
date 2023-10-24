import React, { useState } from 'react';
import './paciente.css'; 

const FormularioPaciente = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        obraSocial: ''
    });
    const [textoBackend, setTextoBackend] = useState('')
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('llamando api ' + e)
        fetch("/api/paciente/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => {
            if (response.statusText) {
                console.log('hay status text y es ' + response.statusText)
                setTextoBackend('Error:' + response.statusText)
            }else setTextoBackend('')
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="pacienteCrearForm border border-gray-300 p-4">
          <form onSubmit={handleSubmit}>
            <div className='mb-2'>
              <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre del paciente" required
              />
            </div>
            <div>
              <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Apellido del paciente" required
              />
            </div>
            <div>
              <label htmlFor="dni" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DNI:</label>
              <input
                type="text"
                id="dni"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="DNI del paciente" required
              />
            </div>
            <div>
              <label htmlFor="obraSocial" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Obra Social:</label>
              <input
                type="text"
                id="obraSocial"
                name="obraSocial"
                value={formData.obraSocial}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Obra social del paciente" required
              />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear Paciente</button>
          </form>
          <label>{textoBackend}</label>
        </div>
      );
    };

export default FormularioPaciente;