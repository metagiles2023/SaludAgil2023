"use client"
import { skeleton } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
//Pido disculpas por lo que van a leer a continuacion
//No pasa nada, pedimos perdon por el componente FichasMedicasFiltradas
const Formulario = ({ fields, url, tema }) => {
    const initialFormData = {};
    fields.forEach((element) => {
        initialFormData[element] = '';
    });

    const [formData, setFormData] = useState(initialFormData);
    const [textoBackend, setTextoBackend] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    // Tema medico y especialidades
    const [especialidades, setEspecialidades] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [pacientes, setPacientes] = useState([])

    useEffect(() => { 
        if (tema === "medico" && fields.includes("especialidad")) {
            fetch("/api/medico/especialidad", {
                method: 'GET'
            })
                .then(async (response) => {
                    console.log('ha llegado la respuesta de la api del front');
                    console.log(response);
                    if (response.status >= 400) {
                        console.log('')
                    }
                    const data = await response.json();
                    setEspecialidades(data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        if (tema === "ficha medica" && fields.includes("medico")) {
            fetch("/api/medico", {
                method: 'GET'
            })
                .then(async (response) => {
                    console.log('ha llegado la respuesta de la api del front');
                    console.log(response);
                    if (response.status >= 400) {
                        console.log('')
                    }
                    const data = await response.json();
                    setMedicos(data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        if (tema === "ficha medica" && fields.includes("paciente")) {
            fetch("/api/paciente", {
                method: 'GET'
            })
                .then(async (response) => {
                    console.log('ha llegado la respuesta de la api del front');
                    console.log(response);
                    if (response.status >= 400) {
                        console.log('')
                    }
                    const data = await response.json();
                    setPacientes(data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [tema, fields]);

    //Tema mensajito
    useEffect(() => {
        clearForm()
        clearTextBackend()
    }, [fields, tema, url]);

    const handleChange = (e) => {
        console.log(e.target)
        let { name, value } = e.target;
        if (e.target.type == "checkbox") {
            console.log('es checkbox')
            value = e.target.checked
            console.log(value)
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleChangeDate = (date) => {
        setSelectedDate(date);
    };
    useEffect(()=>{
        const obj = { name: "fecha", value: (selectedDate !== null) ? selectedDate : "x"}
        
        setFormData({
            ...formData,
            [obj.name]: obj.value
        });
    }, [selectedDate])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('llamando api ' + url);
        console.log(formData)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                console.log('ha llegado la respuesta de the api del front');
                console.log(response);
                if (response.status >= 400) {
                    if (response.statusText) {
                        console.log('hay status text y es ' + response.statusText);
                        setTextoBackend(response.statusText);
                    }
                } else {
                    setTextoBackend(`${capFirst(tema)} creado con éxito`);
                    clearForm();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const clearForm = () => {
        setFormData(initialFormData);
    };

    const clearTextBackend = () => {
        setTextoBackend('')
    }

    const renderField = (element, i) => {
        // Casos especiales
        if (element === "especialidad") {
            return (
                <div key={i} className="mb-2">
                    <label htmlFor={element} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"> {capFirst(element)}: </label>
                    <select
                        id={element}
                        name={element}
                        value={formData[element]}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="" disabled>Choose an especialidad</option>
                        {especialidades.map((option) => (
                            <option key={option.nombre} value={option.nombre}>
                                {option.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            );
        } else if (tema === "ficha medica" && element === "medico") {
            return (
                <div key={i} className="mb-2">
                    <label htmlFor={element} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"> {capFirst(element)}: </label>
                    <select
                        id={element}
                        name={element}
                        value={formData[element]}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="" disabled>Choose a Medico</option>
                        {medicos.map((option) => (
                            <option key={option.nombre} value={option.idUsuario}>
                                {option.apellido + ` (id: ${option.idUsuario})`}
                            </option>
                        ))}
                    </select>
                </div>
            );
        } else if (tema === "ficha medica" && element === "paciente") {
            return (
                <div key={i} className="mb-2">
                    <label htmlFor={element} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"> {capFirst(element)}: </label>
                    <select
                        id={element}
                        name={element}
                        value={formData[element]}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="" disabled>Choose a Paciente</option>
                        {pacientes.map((option) => (
                            <option key={option.nombre} value={option.idUsuario}>
                                {option.apellido + `, ${option.nombre} (id: ${option.idUsuario})`}
                            </option>
                        ))}
                    </select>
                </div>
            );
        } else if (tema === "ficha medica" && (element === "esGrave" || element === "usoEmergencia")) {
            return (
                <div key={i} className='mb-2'>
                  <label htmlFor={element} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    {capFirst(element)}:
                  </label>
                  <input
                    type="checkbox"
                    id={element}
                    name={element}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              );
        } else if (tema === "ficha medica" && element === "fecha") {
            return (
                <div key={i} className='mb-2'>
                  <label htmlFor={element} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    {capFirst(element)}:
                  </label>
                  {/* <input
                    type="text"
                    id={element}
                    name={element}
                    value={(formData[element].toISOString) ? formData[element].toISOString() : '2023-10-26T10:00:00'} // Format the date as ISO 8601
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`${capFirst(element)} del ${tema}`}
                    required
                  /> */}
                  <DatePicker className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' dateFormat='yyyy/MM/dd' selected={selectedDate} onChange={handleChangeDate}/>
                </div>
              );
        }

        // Casos normales (string)
        return (
            <div key={i} className='mb-2'>
                <label htmlFor={element} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{capFirst(element)}:</label>
                <textarea
                    type="text"
                    id={element}
                    name={element}
                    value={formData[element]}
                    onChange={handleChange}
                    style={{ width: '1200px', height: '200px' }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-700 py-16 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${capFirst(element)} del ${tema}`} required
                />
            </div>
        )
    };

    return (
        <div className="text-xl text-black border border-gray-600 p-6">
            <form onSubmit={handleSubmit}>
                {fields.map(renderField)}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 py-4 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800">Crear {capFirst(tema)}</button>
            </form>
            <label>{textoBackend}</label>
        </div>
    );
};

export default Formulario;

function capFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
