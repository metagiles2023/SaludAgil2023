import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';




export default function Popup(props){

    const {idTurno,idUsuario,openPopup, setOpenPopup,onSubmit} = props;
    const [values, setValues] = useState({
        email:"",
        telefono:""
    })

    const [errorMessages, setErrorMessages] = useState({
        email: '',
        telefono: ''
      });

    const handleInputchange = (event) => {
        const {name, value} = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    const handleForm = (event) => {
        event.preventDefault();
        onSubmit({"idTurno":idTurno,"idUsuario": idUsuario,"email":values.email,"telefono":values.telefono});
        /*
        const errors = {};

        if (!values.email) {
        errors.email = 'El campo Email no puede estar vacío';
        }

        if (!values.telefono) {
        errors.telefono = 'El campo Teléfono no puede estar vacío';
        }
        setErrorMessages(errors);
        if (Object.keys(errors).length === 0) {
            handlePOST(idTurno, idUsuario, values.email, values.telefono);
            setOpenPopup(false);
            console.log(values);

          }
          */
    }


    return (
        <Dialog open={openPopup} maxWidth="md">
            <DialogTitle>
                <div style={{display:'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow: '1'}}>
                        Confirmacion de turno
                    </Typography>
                    <button onClick={() => {setOpenPopup(false)}}>X</button>

                </div>
            </DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={handleForm}>
                        <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        onChange={handleInputchange}>
                        </input>
                        {errorMessages.email && <p>{errorMessages.email}</p>}

                        <input
                        name="telefono"
                        type="text"
                        placeholder="Telefono"
                        onChange={handleInputchange}>
                        </input>
                        {errorMessages.telefono && <p>{errorMessages.telefono}</p>}
                        <button type='submit'>Confirmar</button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>

    )
}