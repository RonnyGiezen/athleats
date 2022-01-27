package nl.hva.server.model;

import java.time.LocalDateTime;
import java.util.List;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ReservationDTO {

    private Long id;

    @Size(max = 255)
    private String description;

    @NotNull
    private ReservationType type;

    private ReservationStatus status;

    @NotNull
    private LocalDateTime beginTime;

    private LocalDateTime endTime;

    @NotNull
    private Integer numberOfPeople;

    private List<Long> tablesByReservations;

    private UserSanitizedDTO owner;

    private List<OrderDTO> orders;

    @NotNull
    private Long restaurantByReservation;

}
