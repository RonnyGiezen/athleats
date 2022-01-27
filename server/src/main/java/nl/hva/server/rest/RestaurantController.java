package nl.hva.server.rest;

import java.util.List;
import javax.validation.Valid;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import nl.hva.server.model.RestaurantDTO;
import nl.hva.server.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@Api(value = "Restaurants")
@SecurityRequirement(name = "athleats")
@RequestMapping(value = "/api/restaurants", produces = MediaType.APPLICATION_JSON_VALUE)
public class RestaurantController extends AbstractController {

    @Autowired
    private RestaurantService restaurantService;

    @ApiOperation(value = "Get all restaurants")
    @GetMapping
    public ResponseEntity<List<RestaurantDTO>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.findAll());
    }

    @ApiOperation(value = "Get all restaurants by admin user")
    @RequestMapping(value = "/find", method = RequestMethod.GET)
    public ResponseEntity<List<RestaurantDTO>> getRestaurant() {
        return ResponseEntity.ok(restaurantService.findAll(getCurrentUser()));
    }
}
