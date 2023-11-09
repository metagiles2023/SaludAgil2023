import React from 'react';
import Formulario from '../Formulario/Formulario';

const FormularioMultiple = ({ formulario }) => {
    let fields = []
    let url = ''
    let tema = ''
    switch(formulario) {
        case "medico":
            fields = ['nombre', 'apellido', 'dni', 'email', 'especialidad']
            url = "/api/medico/create"
            tema = "medico"
            return (
                <Formulario
                fields={fields}
                url={url}
                tema={tema}
                />
            )
        case "administrador":
            return (
                <h1>este es el formulario de crear administrador</h1>
            )    
        case "paciente":
            fields = ['nombre', 'apellido', 'dni', 'obraSocial']
            url = "/api/paciente/create"
            tema = "paciente"
            return (
                <Formulario
                fields={fields}
                url={url}
                tema={tema}
                />
            )
            case "especialidad":
                fields = ['nombre', 'descripcion']
                url = "/api/medico/especialidad/create"
                tema = "especialidad"
                return (
                    <Formulario
                    fields={fields}
                    url={url}
                    tema={tema}
                    />
                )
            case "ficha-medica":
                fields = ['medico', 'paciente', 'fecha', 'diagnostico', 'esGrave', 'usoEmergencia'],
                url = "/api/ficha-medica/create"
                tema = "ficha medica"
                return (
                    <Formulario
                    fields={fields}
                    url={url}
                    tema={tema}
                    />
                )
    }
};

export default FormularioMultiple;