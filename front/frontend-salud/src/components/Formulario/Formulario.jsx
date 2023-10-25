import React, { useState } from 'react';

const Formulario = ({fields, url, tema}) => {
    const initialFormData = {}
    console.log(fields)
    fields.forEach(element => {
        initialFormData[element] = ''
    });

    const [formData, setFormData] = useState(initialFormData);
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
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => {
            if (response.statusText) {
                console.log('hay status text y es ' + response.statusText)
                setTextoBackend(response.statusText)
            }else {
                setTextoBackend('')
                clearForm()
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    const clearForm = () => {
        setFormData(initialFormData); // Reset the form data to its initial state
    };



    return (
        <div className="border border-gray-300 p-4">
          <form onSubmit={handleSubmit}>
            {fields.map((element,i) => {
                return (<div key={i} className='mb-2'>
                <label htmlFor={element} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{capFirst(element)}:</label>
                <input
                  type="text"
                  id={element}
                  name={element}
                  value={(formData[element])}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={capFirst(element) + " del " + tema } required
                />
              </div>)
            })}
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear {capFirst(tema)}</button>
          </form>
          <label>{textoBackend}</label>
        </div>
      );
    };

export default Formulario;

function capFirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}