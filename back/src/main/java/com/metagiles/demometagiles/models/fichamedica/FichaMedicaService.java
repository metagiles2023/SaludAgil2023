package com.metagiles.demometagiles.models.fichamedica;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.metagiles.demometagiles.models.Filtro.Filtro;
import com.metagiles.demometagiles.models.Filtro.FiltroAND;
import com.metagiles.demometagiles.models.Filtro.FiltroEmergencia;
import com.metagiles.demometagiles.models.Filtro.FiltroFechaDesde;
import com.metagiles.demometagiles.models.Filtro.FiltroFechaHasta;
import com.metagiles.demometagiles.models.Filtro.FiltroGrave;
import com.metagiles.demometagiles.models.Filtro.FiltroMedico;
import com.metagiles.demometagiles.models.Filtro.FiltroPaciente;
import com.metagiles.demometagiles.models.Filtro.FiltroRequest;
import com.metagiles.demometagiles.models.medico.MedicoRepository;
import com.metagiles.demometagiles.models.paciente.PacienteRepository;
import com.metagiles.demometagiles.models.sesion.Session;
import com.metagiles.demometagiles.models.sesion.SessionCacheService;
import com.metagiles.demometagiles.utils.Utils;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class FichaMedicaService {
    private final FichaMedicaRepository fichaMedicaRepository;
    private final MedicoRepository medicoRepository;
    private final PacienteRepository pacienteRepository;
    private final SessionCacheService sessionCacheService;

    public List<FichaMedica> findAllFichaMedicas(FiltroRequest filtroRequest, String token){ 
        System.out.println("findAllFichasMedicas, token: " + token);
        Session session = sessionCacheService.getSession(token);
        if (session == null) { //significa que el login es invalido
            System.out.println("No esta logueado. Salgo");
            return null;
        }
        if(session.getUsuario().getRol().equals("paciente")){
            System.out.println("Permisos incorrectos. Salgo");
            return null;   //no tiene permisos para eso
        }
        System.out.println("getting fichas medicas");
        List<FichaMedica> fichas = null;
        try {
            fichas = fichaMedicaRepository.findAll();
            fichas = filtrarFichas(fichas, filtroRequest);
            System.out.println("fichas length " + fichas.size());
            return fichas;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return fichas;
        }
    }

    public List<FichaMedica> filtrarFichas(List<FichaMedica> fichas, FiltroRequest fRequest){
        Filtro filtroGeneral = null;
        List<FichaMedica> filteredFichas = new ArrayList<>();

        //Preparacion del filtroGeneral
        if (fRequest.getFechaDesde() != null && fRequest.getFechaHasta() != null){
            //devolver entre ambos
            FiltroFechaDesde fDesde = new FiltroFechaDesde(fRequest.getFechaDesde());
            FiltroFechaHasta fHasta = new FiltroFechaHasta(fRequest.getFechaHasta());
            filtroGeneral = new FiltroAND(fDesde, fHasta); //Sin ternaria porque es el primero
        }
        if (fRequest.getFechaDesde() == null && fRequest.getFechaHasta() != null) {
            FiltroFechaHasta fHasta = new FiltroFechaHasta(fRequest.getFechaHasta());
            filtroGeneral = (filtroGeneral != null) ? new FiltroAND(filtroGeneral, fHasta) : fHasta;
        }
        if (fRequest.getFechaDesde() != null && fRequest.getFechaHasta() == null) {
            FiltroFechaDesde fDesde = new FiltroFechaDesde(fRequest.getFechaDesde());
            filtroGeneral = (filtroGeneral != null) ? new FiltroAND(filtroGeneral, fDesde) : fDesde;
        }
        if (fRequest.getFiltraEmergencia()!= null) {
            FiltroEmergencia fEmergencia = new FiltroEmergencia(fRequest.getFiltraEmergencia());
            filtroGeneral = (filtroGeneral != null) ? new FiltroAND(filtroGeneral, fEmergencia) : fEmergencia;
        }
        if (fRequest.getFiltraGrave()!= null) {
            FiltroGrave fGrave = new FiltroGrave(fRequest.getFiltraGrave());
            filtroGeneral = (filtroGeneral != null) ? new FiltroAND(filtroGeneral, fGrave) : fGrave;
        }
        if (fRequest.getMedico() != null) {
            FiltroMedico fMedico = new FiltroMedico(fRequest.getMedico());
            filtroGeneral = (filtroGeneral != null) ? new FiltroAND(filtroGeneral, fMedico) : fMedico;
        }
        if (fRequest.getPaciente() != null) {
            FiltroPaciente fPaciente = new FiltroPaciente(fRequest.getPaciente());
            filtroGeneral = (filtroGeneral != null) ? new FiltroAND(filtroGeneral, fPaciente) : fPaciente;
        }
        //Filtrado
        if (filtroGeneral != null) {
            for (FichaMedica ficha : fichas) {
                if (filtroGeneral.cumple(ficha)) {
                    filteredFichas.add(ficha); 
                }
            }
        } else return fichas;
        return filteredFichas;
    }

    public ResponseEntity<?> crearFichaMedica(FichaMedica fichaMedicaRequest, String token) {
        Session session = sessionCacheService.getSession(token);
        if (session == null) { //significa que el login es invalido
            return Utils.genResponseError("Token invalido");
        }
        if (session.getUsuario().getRol().equals("medico")) {
            if (session.getUsuario().getIdUsuario() != fichaMedicaRequest.getMedico()) {
                Utils.genResponseError("No puedes crear una ficha médica para otro medico.");
            }
        } else if (session.getUsuario().getRol().equals("paciente")) {
            return Utils.genResponseError("No tiene permisos para crear fichas medicas.");
        }
        try {
            if (!medicoRepository.existsById(fichaMedicaRequest.getMedico())) {
                return Utils.genResponseError("Medico no existe.");
            }
            if (!pacienteRepository.existsById(fichaMedicaRequest.getPaciente())) {
                return Utils.genResponseError("Paciente no existe.");
            }
            
            // Parse JSON request data into a FichaMedica object
            FichaMedica fichaMedica = new FichaMedica();
            
            // Set properties from the request
            fichaMedica.setMedico(fichaMedicaRequest.getMedico());
            fichaMedica.setPaciente(fichaMedicaRequest.getPaciente());
            fichaMedica.setDate(fichaMedicaRequest.getDate());
            fichaMedica.setDiagnostico(fichaMedicaRequest.getDiagnostico());
            fichaMedica.setEsGrave(fichaMedicaRequest.isEsGrave());
            fichaMedica.setUsoEmergencia(fichaMedicaRequest.isUsoEmergencia());
            
            // Save the FichaMedica to the repository
            FichaMedica savedFicha = fichaMedicaRepository.save(fichaMedica);
            return ResponseEntity.ok(savedFicha.getIdFichaMedica());
        } catch(Exception e) {
            return Utils.genResponseError("Error creating FichaMedica: "  + e.getMessage());
        }
    }
}
