import React from 'react';
import ListaUsuarios from '../Usuario/Usuario';
import ListaMedicos from '../Medico/Medico';
import ListaPacientes from '../Paciente/Paciente';

const ListaMultiple = ({ lista, datos}) => {
    switch(lista) {
        case "usuario":
            return (
                <ListaUsuarios usuarios={datos}/>
            )
        case "medico":
            return (
                <ListaMedicos medicos={datos}/>
            )
        case "administrador":
            return (
                <h1>estos son los administradores</h1>
            )    
        case "paciente":
            return (
                <ListaPacientes pacientes={datos}/>
            )
    }
};

export default ListaMultiple;