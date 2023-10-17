package com.metagiles.demometagiles;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Clase1Controller {
    private final Clase1Repository repository;

    Clase1Controller(Clase1Repository repository) {
        this.repository = repository;
    }

    @GetMapping("/getAll")
    List<Clase1> getAll() {
        System.out.println("hi!");
        return repository.findAll();
    }
}
