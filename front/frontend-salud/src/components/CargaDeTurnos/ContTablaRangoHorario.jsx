'use client';
import Header from "@/components/Estructura/Header";
import Footer from "@/components/Estructura/Footer";
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 16;
function getStyles(hora, fecha, theme) {
    return {
      fontWeight:
        fecha.indexOf(hora) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

const horas = [
    '5:00',
    '5:30',
    '6:00',
    '6:30',
    '7:00',
    '7:30',
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
  ];

  const duracionTurnos = [
    '5',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
    '60',
    '65',
    
  ];

export default function Turnos({ selectedDays }) {
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    
    const theme = useTheme();
    const [fechaDesde, setFechaDesde] = useState([]);
    const handleChangeSelectDesde = (event) => {
        setFechaDesde(event.target.value);
    };
    
    const [fechaHasta, setFechaHasta] = useState([]);
    const handleChangeSelectHasta = (event) => {
        setFechaHasta(event.target.value);
    };

    const [turno, setDuracionTurno] = useState([]);
    const handleChangeSelectDuracionTurno = (event) => {
        setDuracionTurno(event.target.value);
    };

    let errormessage = (selectedDays == "") || (fechaDesde == "") || (fechaHasta == "") || (turno == "") ? "No se cargaron todos los campos" : "";
    const handleGuardarClick = async () => {

        if ((selectedDays == "") || (fechaDesde == "") || (fechaHasta == "") || (turno == "")) {
            console.error('Incomplete data. Please fill in all fields.');
            return;
        }
        const bodySend = {
            "horaini": fechaDesde,
            "horafin": fechaHasta,
            "dia": selectedDays.toString(),
            "tiempoturno": turno,
            "idMedico": "1"
        };
        
        
        try {
            const response = await fetch(`/api/portalmedico/cargarTurnos`, {
                method: 'POST',
                body: JSON.stringify(bodySend),
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
            });
        
            if (response.ok) {
                console.log(response.status);
                errormessage = response.status;
                // Request was successful, you can decide what to do here
            } else {
                // Handle errors or non-OK responses
                errormessage = response.status;
                console.error('Request failed with status:', response.status);
                const errorMessage = await response.text(); // Get more detailed error message from the server
                console.error('Error details:', errorMessage);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        
    };
    
    const buttonColor = (selectedDays == "") || (fechaDesde == "") || (fechaHasta == "") || (turno == "") ? "error" : "success";
    const buttonClassName = (selectedDays == "") || (fechaDesde == "") || (fechaHasta == "") || (turno == "") ? "bg-red-500" : "bg-green-500";
    return (
        <div className="flex justify-around w-full h-full">
            <div className="flex items-center -translate-y-4 gap-10 p-5">
                <FormControl sx={{ width: 150 }}>
                    <InputLabel id="label-fecha-desde">Desde</InputLabel>
                    <Select
                    labelId="select-fecha-desde"
                    id="id-select-fecha-desde"
                    multiple={false}
                    value={fechaDesde}
                    onChange={handleChangeSelectDesde}
                    input={<OutlinedInput label="Hora" />}
                    MenuProps={MenuProps}
                    style={{ width: '100%' }}
                    >
                    {horas.map((hora) => (
                        <MenuItem
                        key={hora}
                        value={hora}
                        style={getStyles(hora, fechaDesde, theme)}
                        >
                        {hora}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: 150 }}>
                    <InputLabel id="label-fecha-desde">Hasta</InputLabel>
                    <Select
                    labelId="select-fecha-desde"
                    id="id-select-fecha-desde"
                    multiple={false}
                    value={fechaHasta}
                    onChange={handleChangeSelectHasta}
                    input={<OutlinedInput label="Hora" />}
                    MenuProps={MenuProps}
                    >
                    {horas.map((hora) => (
                        <MenuItem
                        key={hora}
                        value={hora}
                        style={getStyles(hora, fechaHasta, theme)}
                        >
                        {hora}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-grow items-center p-10">
                    <FormControl sx={{ width: 150 }}>
                        <InputLabel id="label-fecha-desde">Duracion</InputLabel>
                        <Select
                        labelId="select-fecha-desde"
                        id="id-select-fecha-desde"
                        multiple={false}
                        value={turno}
                        onChange={handleChangeSelectDuracionTurno}
                        input={<OutlinedInput label="Turno" />}
                        MenuProps={MenuProps}
                        >
                        {duracionTurnos.map((turno) => (
                            <MenuItem
                            key={turno}
                            value={turno}
                            style={getStyles(turno, fechaHasta, theme)}
                            >
                            {turno}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="flex justify-end pr-5"> 
                    <p className="absolute left-[46%] justify-center text-left text-black align-middle">
                        {errormessage}
                    </p>
                    <Button className={`flex ${buttonClassName}`} variant="contained" color={buttonColor} onClick={handleGuardarClick}>
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    );
}