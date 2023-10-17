package com.metagiles.demometagiles;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Clase1 {
    private @Id String the_id;
    private String the_field1;

    //Necesario
    public Clase1() {

    }

    public Clase1(String the_id, String the_field1) {
        System.out.println("Se crea una instancia de Clase1");
        this.the_id = the_id;
        this.the_field1 = the_field1;
    }

    public String getId() {
        return the_id;
    }

    public String getField1() {
        return the_field1;
    }
}
