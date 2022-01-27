package nl.hva.server.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import nl.hva.server.model.DinnertableDTO;
import nl.hva.server.service.DinnertableService;
import nl.hva.server.service.RestaurantService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@Api(value = "DinnerTables")
@SecurityRequirement(name = "athleats")
@RequestMapping(value = "/api/dinnertables", produces = MediaType.APPLICATION_JSON_VALUE)
public class DinnertableController {

    private final DinnertableService dinnertableService;
    private final RestaurantService restaurantService;

    public DinnertableController(
            final DinnertableService dinnertableService,
            final RestaurantService restaurantService) {
        this.dinnertableService = dinnertableService;
        this.restaurantService = restaurantService;
    }

    @ApiOperation(value = "Get tables by restaurant id")
    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<DinnertableDTO>> getDinnerTablesByRestaurant(@PathVariable final Long id) {
        if (restaurantService.get(id) == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(dinnertableService.findAllByRestaurantId(id));
    }
}
