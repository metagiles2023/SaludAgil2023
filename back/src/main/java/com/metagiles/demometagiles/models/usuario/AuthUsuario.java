package com.metagiles.demometagiles.models.usuario;

//Clase que modela la respuesta del Usuario autenticado.

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AuthUsuario {
    private String token;
    private Usuario usuario;
}
