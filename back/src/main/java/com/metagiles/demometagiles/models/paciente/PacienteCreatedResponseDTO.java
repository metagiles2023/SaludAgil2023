package com.metagiles.demometagiles.models.paciente;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PacienteCreatedResponseDTO {
    /* Debe tener los atributos que quiero devolver al crear un paciente
    /* {"id": 2} */

    private Long id;
}