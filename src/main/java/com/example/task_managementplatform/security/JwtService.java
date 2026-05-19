package com.example.task_managementplatform.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    // cheia secreta folosita pentru semnarea tokenului
    private static final String SECRET_KEY = "cheieultramegasecretasigreudeghicitsifoartelungapentruhs256algoritm33";

    public String generateToken(String email) {

        return Jwts.builder()

                // identificatorul userului
                .setSubject(email)

                // momentul generarii
                .setIssuedAt(new Date())

                // token valid 1 ora
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60)
                )

                // semnatura tokenului
                .signWith(
                        SignatureAlgorithm.HS256,
                        SECRET_KEY
                )

                // transforma in string JWT
                .compact();

    }

}