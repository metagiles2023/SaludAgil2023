package com.metagiles.demometagiles.utils;

public class Utils {
    //Esto es de validez del input, no de que exista o no en la tabla.
    public static boolean esDniValido(String dni) {
        //Aca seria posible poner otros checks. 
        System.out.println("dni length: " + dni.length());
        System.out.println(dni.matches("\\d+"));
        return (dni.length() > 6 && dni.length() < 9 && dni.matches("\\d+"));
    }
}
