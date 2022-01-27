package nl.hva.server.rest;

import nl.hva.server.domain.User;
import nl.hva.server.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public abstract class AbstractController {

    @Autowired
    private UserRepository userRepository;

    protected User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == "anonymousUser") {
            return null;
        }

        Optional<User> foundUser = userRepository.findByEmail(
                ((UserDetails) principal).getUsername()
        );
        return foundUser.orElse(null);
    }

}
