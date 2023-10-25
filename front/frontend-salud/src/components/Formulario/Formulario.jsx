import React, { useEffect, useState } from 'react';

const Formulario = ({ fields, url, tema }) => {
    const initialFormData = {};
    fields.forEach((element) => {
        initialFormData[element] = '';
    });

    const [formData, setFormData] = useState(initialFormData);
    const [textoBackend, setTextoBackend] = useState('');

    // Tema medico y especialidades
    const [especialidades, setEspecialidades] = useState([]);
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
    }, [tema, fields]);

    //Tema mensajito
    useEffect(() => {
        clearForm()
        clearTextBackend()
    }, [fields, tema, url]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('llamando api ' + url);
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
                    <label htmlFor={element} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> {capFirst(element)}: </label>
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
        }

        // Casos normales (string)
        return (
            <div key={i} className='mb-2'>
                <label htmlFor={element} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{capFirst(element)}:</label>
                <input
                    type="text"
                    id={element}
                    name={element}
                    value={formData[element]}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${capFirst(element)} del ${tema}`} required
                />
            </div>
        )
    };

    return (
        <div className="border border-gray-300 p-4">
            <form onSubmit={handleSubmit}>
                {fields.map(renderField)}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800">Crear {capFirst(tema)}</button>
            </form>
            <label>{textoBackend}</label>
        </div>
    );
};

export default Formulario;

function capFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
