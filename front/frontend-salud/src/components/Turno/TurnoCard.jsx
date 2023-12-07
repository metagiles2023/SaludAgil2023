import React, { useState } from 'react';
import { cancelarTurno } from '@/app/api/misturnos/cancelar/route';
import ConfirmCancelar from './ConfirmCancelar';
import { useSession } from 'next-auth/react'; // Import useSession hook
import { useEffect} from 'react';

function TurnoCard({ turno }) {
    const { id, medico_nombre, medico_apellido, medico_especialidad, date } = turno;
    const [showDialog, setShowDialog] = useState(false);
    
    const [datePart, timePart] = date.split(' ');
    const [year, month, day] = datePart.split('-');
    const hour = timePart.split(':')[0];
    const minute = timePart.split(':')[1];

    //sesion
    const { data: session } = useSession(); // useSession hook to get the current user
    const [token, setToken] = useState([])
    
    useEffect(() => {
        console.log("USE EFFECT MIS TURNOS")
        let user = session?.user
        let token = user && user.token ? user.token : "no-token-for-fichasmedicasfiltradas"
        setToken(token)
        console.log(session);
      }, [session])


    // Constructing formatted date and time
    const formattedDate = `${parseInt(day)}/${parseInt(month)}/${year}`;
    const formattedTime = `${hour}:${minute}`;

    const handleCancelar = () => {
        setShowDialog(true);
      };

    const handleConfirmCancel = async () => {
        try {
        const response = await fetch(`/api/misturnos/cancelar?tid=${id}`, {
            method: 'POST',
            body: JSON.stringify({token: token,tid:id}),
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Request was successful, you can decide what to do here
        } else {
            // Handle errors or non-OK responses
            console.error('Request failed with status:', response.status);
        }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        
        window.location.reload();
        setShowDialog(false);
    };

    return (
        <div className="flex flex-col w-[326px] h-[392px] bg-[#ebffff] shadow-[10px_20px_4px_#00000040] rounded-[30px] overflow-hidden">
            <div className="flex flex-grow py-3 flex-col">
                <div className='flex flex-col'>
                    <div className="flex pt-5 justify-center font-bold text-black text-xl text-center">{medico_especialidad}</div>
                    <div className="flex justify-center font-bold text-black text-2xl text-center">{medico_nombre} {medico_apellido}</div>
                </div>
                <div className='flex flex-col m-auto'>
                    <div className="flex justify-center font-bold text-black text-[32px] text-center">Fecha:</div>
                    <div className="flex justify-center font-bold text-black text-xl text-center">{formattedDate}</div>
                    <div className="flex justify-center font-bold text-black text-xl text-center">{formattedTime}</div>
                </div>
            </div>
            <div className='border-t-[5px]  border-black'>
                <div className="flex justify-center item-center bg-[#d0321d]   hover:opacity-80 hover:cursor-pointer " onClick={handleCancelar}>
                    <div className="flex justify-center w-1/6  m-auto hover:opacity-70 ">
                        <img className="flex my-3" src="/btn_cancelar.svg" alt="Cancelar"/>
                        <h1 className="flex m-auto text-black font-bold text-2xl pl-5">Cancelar</h1>
                    </div>
                </div>
            </div>
            <ConfirmCancelar
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                onConfirm={handleConfirmCancel}
                message="Estás seguro que deseas cancelar el turno seleccionado?"
            />
        </div>
    );
}

export default TurnoCard;
