package nl.hva.server.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.stream.Collectors;

import nl.hva.server.domain.Restaurant;
import nl.hva.server.domain.User;
import nl.hva.server.model.UserDTO;
import nl.hva.server.repos.RestaurantRepository;
import nl.hva.server.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                new ArrayList<>());
    }

    public User save(UserDTO userDTO){
        if (userRepository.findByEmail(userDTO.getEmail()).orElse(null) != null) throw new ResponseStatusException(HttpStatus.IM_USED);
        User newUser = new User();
        newUser.setUsername(userDTO.getUsername());
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(bcryptEncoder.encode(userDTO.getPassword()));
        newUser.setUserRole(userDTO.getUserRole());
        return userRepository.save(newUser);
    }

}
