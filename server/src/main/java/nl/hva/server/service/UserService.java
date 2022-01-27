package nl.hva.server.service;

import nl.hva.server.domain.User;
import nl.hva.server.model.UserDTO;
import nl.hva.server.repos.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> findAll(User currentUser) {
        if (!currentUser.isAdmin()) throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        return userRepository.findAll()
                .stream()
                .map(user -> mapToDTO(user, new UserDTO()))
                .collect(Collectors.toList());
    }

    public UserDTO get(final Long id, User currentUser) {
        if (!(currentUser.isAdmin() || currentUser.getId().equals(id))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        return userRepository.findById(id)
                .map(user -> mapToDTO(user, new UserDTO()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public void update(final Long id, final UserDTO userDTO, User currentUser) {
        final User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!(currentUser.isAdmin() || currentUser.getId().equals(id))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        mapToEntity(userDTO, user);
        userRepository.save(user);
    }

    public void delete(final Long id, User currentUser) {
        if (!(currentUser.isAdmin() || currentUser.getId().equals(id))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        userRepository.deleteById(id);
    }

    public UserDTO mapToDTO(final User user, final UserDTO userDTO) {
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setUserRole(user.getUserRole());
        return userDTO;
    }

    private User mapToEntity(final UserDTO userDTO, final User user) {
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setUserRole(userDTO.getUserRole());
        return user;
    }

}
