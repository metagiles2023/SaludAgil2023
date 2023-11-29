package com.metagiles.demometagiles.utils;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Utils {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    //Esto es de validez del input, no de que exista o no en la tabla.
    public static boolean esDniValido(String dni) {
        //Aca seria posible poner otros checks. 
        System.out.println("dni length: " + dni.length());
        System.out.println(dni.matches("\\d+"));
        return (dni.length() > 6 && dni.length() < 9 && dni.matches("\\d+"));
    }

    public static HashMap<String, String> jsonificar(String key, String value) 
    {
        HashMap<String, String> json = new HashMap<>();
        json.put(key, value);
        return json;
    }

    public static HashMap<String, Long> jsonificar(String key, Long value) {
        HashMap<String, Long> json = new HashMap<>();
        json.put(key, value);
        return json;
    }

    public static ResponseEntity<HashMap<String, String>> genResponseError(String texto) {
        System.out.println(HttpStatus.BAD_REQUEST + texto);
        HashMap<String, String> json = Utils.jsonificar("error", texto);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);
    }

    public static Date generateDate() {
        Date currentDate = new Date();

        // Create a calendar instance and set it to the current date and time
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);

        // Add 20 minutes to the current time
        calendar.add(Calendar.MINUTE, 20);

        // Get the new date after adding 20 minutes
        Date newDate = calendar.getTime();
        return newDate;
    }

    public static String jsonificar(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            // Handle the exception or log an error
            e.printStackTrace();
            return null; // Or return an appropriate error response
        }
    }
}
