"use client"
import React from 'react';
import { useState, useEffect } from 'react';


const Selector = ({onSelectOption, usuarios}) => {

    const [datos, setDatos] = useState([]);
    const [titulo, setTitulo] = useState(
        usuarios.charAt(0).toUpperCase() + usuarios.slice(1)
    );
    const [ultiOption, setUltiOption] = useState(null);
    
    const tituloOriginal = usuarios.charAt(0).toUpperCase() + usuarios.slice(1);

    useEffect(() => {
        // Make an HTTP GET request to your backend API
        fetch(`/api/${usuarios}`, {
            method: 'GET',
        })  
            .then((response) => response.json())
            .then((data) => {
            // Update the fichaMedica state with the data from the backend
            setDatos(data);
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
        }, []); 
    
    

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
    

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = (option, index) => {
        setMedicoSeleccionado({ nombre: option.nombre, apellido: option.apellido, index: index});
        if(ultiOption && ultiOption.idUsuario === option.idUsuario){
            setTitulo(tituloOriginal);
            setUltiOption(null);
        }else{
            setTitulo(`${option.nombre} ${option.apellido}`);
            setUltiOption(option);
        }
        onSelectOption(option);
        setIsDropdownOpen(false);
    }

    //const titulo = usuarios.charAt(0).toUpperCase() + usuarios.slice(1);

    return(

        <div className='relative inline-block text-left'>
            <div className='relative'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring focus:ring-blue-300' onClick={toggleDropdown} >
                    {titulo}
                </button>
            </div>
            {isDropdownOpen && (
                <div className='origin-top-right absolute left-0 mt-2'>
                    <div className="w-64 bg-white border border-gray-300 rounded shadow-md overflow-y-auto max-h-48">
                        <div className='py-1'>
                            {datos.map((option, index) => (
                                <a href='#' key={index} className='block px-4 py-2 hover:bg-gray-100' onClick={() => closeDropdown(option, index)}>
                                    <div className="flex items-center">
                                        <span className="mr-2">{`${option.idUsuario}`}</span>
                                        <span className='mr-2'>{`${option.nombre}`}</span>
                                        <span className='mr-2'>{`${option.apellido}`}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div> 
            )
        }
    </div>
    )
}

export default Selector;
