package nl.hva.server.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import nl.hva.server.model.OpeningsHoursDTO;
import nl.hva.server.service.OpeningsHoursService;
import nl.hva.server.service.RestaurantService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@Api(value = "Openingshours")
@SecurityRequirement(name = "athleats")
@RequestMapping(value = "/api/openingshours", produces = MediaType.APPLICATION_JSON_VALUE)
public class OpeningsHoursController {

    private final OpeningsHoursService openingsHoursService;
    private final RestaurantService restaurantService;

    public OpeningsHoursController(
            final OpeningsHoursService openingsHoursService,
            final RestaurantService restaurantService) {
        this.openingsHoursService = openingsHoursService;
        this.restaurantService = restaurantService;
    }

    @ApiOperation(value = "Get all openings hours by restaurant")
    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<OpeningsHoursDTO>> getOpeningsHours(@PathVariable final Long id) {
        if (restaurantService.get(id) == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(openingsHoursService.findAllByRestaurantId(id));
    }

}
