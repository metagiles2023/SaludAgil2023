package com.metagiles.demometagiles.models.paciente;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PacienteMapper {
    PacienteMapper instance = Mappers.getMapper(PacienteMapper.class);

    @Mapping(source = "paciente.idUsuario", target = "id")
    public PacienteCreatedResponseDTO pacienteToPacienteCreatedResponseDTO(Paciente paciente);
}
