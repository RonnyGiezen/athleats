package nl.hva.server.model;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;


@Getter
@Setter
public class ErrorResponse {

    private HttpStatus httpStatus;
    private LocalDateTime timestamp;
    private String exception;
    private String message;
    private List<FieldError> fieldErrors;

    public ErrorResponse(){
        timestamp = LocalDateTime.now();
    }

    public ErrorResponse(HttpStatus status){
        this();
        this.httpStatus = status;
    }

    public ErrorResponse(HttpStatus status, String message){
        this(status);
        this.message = message;
    }

}
