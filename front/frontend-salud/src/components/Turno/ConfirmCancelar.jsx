import React, { useState } from 'react';

function ConfirmCancelar({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="z-10 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-50 bg-gray-700">
      <div className="bg-[#ebffff] text-black p-4 rounded shadow-md">
        <p>{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              onClose();
            }}
            className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
            }}
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCancelar;