package ca.bluenose.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorMessage extends Throwable{

    private final String STATUS = "error";

    private String message;
}