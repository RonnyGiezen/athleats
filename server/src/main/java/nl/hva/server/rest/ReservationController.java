package nl.hva.server.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import nl.hva.server.model.ReservationDTO;
import nl.hva.server.model.ReservationStatusDTO;
import nl.hva.server.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Api(value = "Reservations")
@SecurityRequirement(name = "athleats")
@RequestMapping(value = "/api/reservations", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReservationController extends AbstractController {

    private final ReservationService reservationService;

    public ReservationController(
            final ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @ApiOperation(value = "Get all reservations by user id")
    @GetMapping("/all")
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
        if (getCurrentUser().isAdmin()){
            return ResponseEntity.ok(reservationService.findAll(getCurrentUser()));
        }
        return ResponseEntity.ok(reservationService.findAllByUser(getCurrentUser()));
    }

    @ApiOperation(value = "Create reservation")
    @PostMapping
    public ResponseEntity<Long> createReservation(
            @RequestBody @Valid final ReservationDTO reservationDTO) {
        return new ResponseEntity<>(reservationService.create(reservationDTO, getCurrentUser()), HttpStatus.CREATED);
    }

    @ApiOperation(value = "Update reservation status")
    @PutMapping("/status/{id}")
    public ResponseEntity<Void> updateReservation(@PathVariable final Long id,
                                                  @RequestBody @Valid final ReservationStatusDTO reservationStatusDTO) {
        reservationService.update(id, reservationStatusDTO, getCurrentUser());
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "Update reservation")
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateReservation(@PathVariable final Long id,
            @RequestBody @Valid final ReservationDTO reservationDTO) {
        reservationService.update(id, reservationDTO, getCurrentUser());
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "Delete reservation")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable final Long id) {
        reservationService.delete(id, getCurrentUser());
        return ResponseEntity.noContent().build();
    }

}
