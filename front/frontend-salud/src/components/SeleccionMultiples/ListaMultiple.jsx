import React from 'react';
import ListaUsuarios from '../Usuario/Usuario';
import ListaMedicos from '../Medico/Medico';
import ListaPacientes from '../Paciente/Paciente';
import ListaAdministradores  from '../Administrador/ListaAdministradores';
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
                <ListaAdministradores administradores={datos}/>
            )    
        case "paciente":
            return (
                <ListaPacientes pacientes={datos}/>
            )
    }
};

export default ListaMultiple;