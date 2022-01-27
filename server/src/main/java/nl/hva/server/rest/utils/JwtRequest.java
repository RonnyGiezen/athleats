package nl.hva.server.rest.utils;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Setter
@Getter
public class JwtRequest implements Serializable {

    private static final long serialVersionUID = 5926468583005150707L;

    @NotNull
    private String username;
    @NotNull
    private String email;
    @NotNull
    private String password;

    //need default constructor for JSON Parsing
    public JwtRequest()
    {

    }

    public JwtRequest(String username, String email, String password) {
        this.setUsername(username);
        this.setEmail(email);
        this.setPassword(password);
    }
}
