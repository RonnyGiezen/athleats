package nl.hva.server.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
public class ReservationStatusDTO {

    @NotNull
    private ReservationStatus status;
}
