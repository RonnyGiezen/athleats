package nl.hva.server.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import nl.hva.server.model.UserDTO;
import nl.hva.server.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;



@RestController
@Api(value = "Users")
@SecurityRequirement(name = "athleats")
@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController extends AbstractController {

    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "Get all users")
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll(getCurrentUser()));
    }

    @ApiOperation(value = "Get specific user by id")
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable final Long id) {
        return ResponseEntity.ok(userService.get(id, getCurrentUser()));
    }

    @ApiOperation(value = "Update user")
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable final Long id,
            @RequestBody @Valid final UserDTO userDTO) {
        userService.update(id, userDTO, getCurrentUser());
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "Delete user")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable final Long id) {
        userService.delete(id, getCurrentUser());
        return ResponseEntity.noContent().build();
    }

}
