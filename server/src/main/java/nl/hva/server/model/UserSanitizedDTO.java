package nl.hva.server.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UserSanitizedDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String username;

}
