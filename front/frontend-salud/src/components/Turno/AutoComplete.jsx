'use client'
import { Autocomplete, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
function AutoComplete({onEspecialidadChange}) {
 
  function capitalizeFirstLetter(str) {
    const firstLetter = str.charAt(0).toUpperCase();
    const remainingLetters = str.slice(1);
    return firstLetter + remainingLetters;
  }

  const [value,setValue] = useState(null);
  //const especialidades = ['Traumatologia','Neurologia','Dermatologia','especialidad2','especialidad3',]
  const [especialidades, setEspecialidades] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Pass the selected value to the parent component using the prop
    onEspecialidadChange(newValue);
  };

  useEffect(() => {
    // Fetch data from the API using fetch() or any other HTTP client library
    fetch("/api/turnosdisponibles/especialidades",{
      method: 'GET',
    })
    .then(async (res) => {
          const data = await res.json();
          const output = [];
          data.forEach(element => {
            output.push(capitalizeFirstLetter(element.nombre));
          });
          console.log(output);
          setEspecialidades(output);
      });
  }, []);


  return (
    <div>
        <Autocomplete
            options={especialidades}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params}/>}
            onChange={handleChange}
        />
    </div>
  );
}

export default AutoComplete;