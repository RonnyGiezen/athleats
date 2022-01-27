package nl.hva.server.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import nl.hva.server.model.MenuItemDTO;
import nl.hva.server.service.MenuItemService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@Api(value = "Menu Items")
@SecurityRequirement(name = "athleats")
@RequestMapping(value = "/api/menuItems", produces = MediaType.APPLICATION_JSON_VALUE)
public class MenuItemController {

    private final MenuItemService menuItemService;

    public MenuItemController(
        final MenuItemService menuItemService
    ) {
        this.menuItemService = menuItemService;
    }

    @ApiOperation(value = "Get MenuItems by restaurant id")
    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<MenuItemDTO>> getMenuItemsByRestaurant(@PathVariable final Long id) {
        return ResponseEntity.ok(menuItemService.findAllByRestaurantId(id));
    }
}
