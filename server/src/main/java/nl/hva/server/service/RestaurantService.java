package nl.hva.server.service;

import java.util.List;
import java.util.stream.Collectors;
import nl.hva.server.domain.Restaurant;
import nl.hva.server.domain.User;
import nl.hva.server.model.RestaurantDTO;
import nl.hva.server.repos.RestaurantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final OpeningsHoursService openingsHoursService;

    public RestaurantService(
            final RestaurantRepository restaurantRepository,
            final OpeningsHoursService openingsHoursService) {
        this.restaurantRepository = restaurantRepository;
        this.openingsHoursService = openingsHoursService;
    }

    public List<RestaurantDTO> findAll() {
        return restaurantRepository.findAll()
                .stream()
                .map(restaurant -> mapToDTO(restaurant, new RestaurantDTO()))
                .collect(Collectors.toList());
    }

    public List<RestaurantDTO> findAll(User user) {
        if (!user.isAdmin()) throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        return restaurantRepository.findAll().stream()
                .map(restaurant -> mapToDTO(restaurant, new RestaurantDTO()))
                .collect(Collectors.toList());
    }

    public RestaurantDTO get(final Long id) {
        return restaurantRepository.findById(id)
                .map(restaurant -> mapToDTO(restaurant, new RestaurantDTO()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Long create(final RestaurantDTO restaurantDTO) {
        final Restaurant restaurant = new Restaurant();
        mapToEntity(restaurantDTO, restaurant);
        return restaurantRepository.save(restaurant).getId();
    }

    public Long create(final Restaurant restaurant){
        return create(mapToDTO(restaurant, new RestaurantDTO()));
    }

    public void update(final Long id, final RestaurantDTO restaurantDTO) {
        final Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        mapToEntity(restaurantDTO, restaurant);
        restaurantRepository.save(restaurant);
    }

    public void delete(final Long id) {
        restaurantRepository.deleteById(id);
    }

    private RestaurantDTO mapToDTO(final Restaurant restaurant, final RestaurantDTO restaurantDTO) {
        restaurantDTO.setId(restaurant.getId());
        restaurantDTO.setName(restaurant.getName());
        restaurantDTO.setPhotos(restaurant.getPhotos());
        restaurantDTO.setLocation(restaurant.getLocation());
        restaurantDTO.setIsClosedTemp(restaurant.getIsClosedTemp());
        var hours = openingsHoursService.findAllByRestaurantId(restaurant.getId());
        if (!hours.isEmpty()){
            restaurantDTO.setOpeningsHours(hours);
        }
        return restaurantDTO;
    }

    private Restaurant mapToEntity(final RestaurantDTO restaurantDTO, final Restaurant restaurant) {
        restaurant.setName(restaurantDTO.getName());
        restaurant.setPhotos(restaurantDTO.getPhotos());
        restaurant.setLocation(restaurantDTO.getLocation());
        restaurant.setIsClosedTemp(restaurantDTO.getIsClosedTemp());
        return restaurant;
    }

}
