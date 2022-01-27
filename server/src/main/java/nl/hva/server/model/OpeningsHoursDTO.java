package nl.hva.server.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.DayOfWeek;
import java.time.OffsetDateTime;


@Getter
@Setter
public class OpeningsHoursDTO {

    private Long id;

    @NotNull
    private DayOfWeek day;

    @NotNull
    private String openTime;

    @NotNull
    private String closingTime;

    private Long restaurant;

}
