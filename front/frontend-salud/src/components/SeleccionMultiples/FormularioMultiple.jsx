import React from 'react';
import FormularioMedico from '../Medico/FormularioMedico';
import FormularioPaciente from '../Paciente/FormularioPaciente';
//import FormularioAdministrador from '../Administrador/FormularioAdministrador';

const FormularioMultiple = ({ formulario }) => {
    switch(formulario) {
        case "medico":
            return (
                <FormularioMedico/>
            )
        case "administrador":
            return (
                <h1>este es el formulario de crear administrador</h1>
            )    
        case "paciente":
            return (
                <FormularioPaciente/>
            )
    }
};

export default FormularioMultiple;