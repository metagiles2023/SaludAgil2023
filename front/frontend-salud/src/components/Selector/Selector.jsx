"use client"
import React from 'react';
import {Select, SelectItem} from '@nextui-org/react';


export default function Selector(option){

    return(

        <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>

            <Select label="Selecciona un medico" className='max-w-xs'>

                {option.map((element) => (
                    <SelectItem key={element.idUsuario} value={element.idUsuario}>
                        {element.nombre}
                    </SelectItem>
                ))}
            </Select>
            
        </div>
    )
}
