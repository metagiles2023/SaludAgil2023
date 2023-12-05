'use client'
import { Autocomplete, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

function AutoComplete({onEspecialidadChange}) {
 const { data: session } = useSession()
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
    const user = session?.user
    const token = user?.token ? user.token : "no-token-for-autocomplete"
    console.log(token);
    // Fetch data from the API using fetch() or any other HTTP client library
    fetch("/api/turnosdisponibles/especialidades",{
      method: 'POST',
      body: JSON.stringify({token: token})
    })
    .then(async (res) => {
          const data = await res.json();
          const output = [];
          data && data.forEach && data.forEach(element => {
            output.push(capitalizeFirstLetter(element.nombre));
          });
          console.log(output);
          setEspecialidades(output);
      });
  }, [session]);


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