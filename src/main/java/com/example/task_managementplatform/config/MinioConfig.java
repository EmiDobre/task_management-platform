//creare obiect care vorbeste cu Minio <=> cum Repository vorbeste cu PostgreSql

package com.example.task_managementplatform.config;

import io.minio.MinioClient;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioConfig {

    //creare obiect MinIOClient care este pus in Spring context
    @Bean
    public MinioClient minioClient() {

        return MinioClient.builder()

                // adresa MinIO din Docker
                .endpoint("http://localhost:9000")

                // credentiale login MinIO
                .credentials(
                        "minioadmin",
                        "minioadmin"
                )

                .build();

    }

}