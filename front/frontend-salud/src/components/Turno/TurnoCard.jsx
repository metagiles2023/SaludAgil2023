import React, { useState } from 'react';
import { cancelarTurno } from '@/app/api/misturnos/cancelar/route';
import ConfirmCancelar from './ConfirmCancelar';

function TurnoCard({ turno }) {
    const { id, medico_nombre, medico_apellido, medico_especialidad, date } = turno;
    const [showDialog, setShowDialog] = useState(false);
    
    const [datePart, timePart] = date.split(' ');
    const [year, month, day] = datePart.split('-');
    const hour = timePart.split(':')[0];
    const minute = timePart.split(':')[1];

    // Constructing formatted date and time
    const formattedDate = `${parseInt(day)}/${parseInt(month)}/${year}`;
    const formattedTime = `${hour}:${minute}`;

    const handleCancelar = () => {
        setShowDialog(true);
      };

    const handleConfirmCancel = async () => {
        const bodySend = {
        "tid": id,
        "pid": 2
        };

        try {
        const response = await fetch(`/api/misturnos/cancelar?pid=2&tid=${id}`, {
            method: 'POST',
            body: JSON.stringify(bodySend),
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Request was successful, you can decide what to do here
            window.location.reload();
        } else {
            // Handle errors or non-OK responses
            console.error('Request failed with status:', response.status);
        }
        } catch (error) {
        console.error('An error occurred:', error);
        }

        setShowDialog(false);
    };

    return (
        <div className="relative w-[326px] h-[392px] bg-[#ebffff] shadow-[10px_20px_4px_#00000040] rounded-[30px] overflow-hidden">
            <div className="absolute w-[326px] h-[23px] font-bold text-black text-xl text-center tracking-[0] leading-[normal] left-0 top-[214px]">{formattedTime}</div>
            <div className="absolute w-[326px] h-[23px] font-bold text-black text-xl text-center tracking-[0] leading-[normal] left-0 top-[191px]">{formattedDate}</div>
            <div className="absolute w-[326px] h-8 font-bold text-black text-xl text-center tracking-[0] leading-[normal] left-0 top-[34px]">{medico_especialidad}</div>
            <div className="absolute w-[326px] h-[38px] font-bold text-black text-[32px] text-center tracking-[0] leading-[normal] left-0 top-[153px]">Fecha:</div>
            <div className="absolute w-[326px] font-bold text-black text-2xl text-center tracking-[0] leading-[normal] left-0 top-[66px]">{medico_nombre} {medico_apellido}</div>
            <div className="absolute bottom-0 w-[326px] h-[89px] bg-[#3ca9b2] border-t-[5px] border-black">
                <img className="w-[46px] absolute h-[46px] left-[241px] top-[17px] hover:opacity-70" src="/btn_cancelar.svg" alt="Cancelar" onClick={handleCancelar} />
                <img className="w-10 absolute h-[46px] left-8 top-[17px] hover:opacity-70" src="/btn_recordatorio.svg" alt="recordatorio"/>
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
