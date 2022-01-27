package nl.hva.server.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class UserDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String username;

    @Size(max = 255)
    private String email;

    @NotNull
    @Size(max = 255)
    private String password;

    @Size(max = 255)
    private UserRole userRole;

}
