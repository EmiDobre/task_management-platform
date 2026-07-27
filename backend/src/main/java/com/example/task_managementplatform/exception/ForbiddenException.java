package com.example.task_managementplatform.exception;

public class ForbiddenException
        extends RuntimeException {

    public ForbiddenException(
            String message
    ) {

        super(message);

    }

}