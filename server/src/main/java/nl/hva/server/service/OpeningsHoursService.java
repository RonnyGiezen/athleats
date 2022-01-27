package nl.hva.server.service;

import nl.hva.server.domain.OpeningsHours;
import nl.hva.server.domain.Restaurant;
import nl.hva.server.model.OpeningsHoursDTO;
import nl.hva.server.repos.OpeningsHoursRepository;
import nl.hva.server.repos.RestaurantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class OpeningsHoursService {

    private final OpeningsHoursRepository openingsHoursRepository;
    private final RestaurantRepository restaurantRepository;

    public OpeningsHoursService(final OpeningsHoursRepository openingsHoursRepository,
                                final RestaurantRepository restaurantRepository) {
        this.openingsHoursRepository = openingsHoursRepository;
        this.restaurantRepository = restaurantRepository;
    }

    public List<OpeningsHoursDTO> findAll() {
        return openingsHoursRepository.findAll()
                .stream()
                .map(openingsHours -> mapToDTO(openingsHours, new OpeningsHoursDTO()))
                .collect(Collectors.toList());
    }

    public List<OpeningsHoursDTO> findAllByRestaurantId(final Long id) {
        return openingsHoursRepository.findAll()
                .stream()
                .filter(openingsHours -> openingsHours.getRestaurantByOpeningsHours().getId().equals(id))
                .map(openingsHours -> mapToDTO(openingsHours, new OpeningsHoursDTO()))
                .collect(Collectors.toList());
    }

    public OpeningsHoursDTO get(final Long id) {
        return openingsHoursRepository.findById(id)
                .map(openingsHours -> mapToDTO(openingsHours, new OpeningsHoursDTO()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Long create(final OpeningsHoursDTO openingsHoursDTO) {
        final OpeningsHours openingsHours = new OpeningsHours();
        mapToEntity(openingsHoursDTO, openingsHours);
        return openingsHoursRepository.save(openingsHours).getId();
    }

    public void update(final Long id, final OpeningsHoursDTO openingsHoursDTO) {
        final OpeningsHours openingsHours = openingsHoursRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        mapToEntity(openingsHoursDTO, openingsHours);
        openingsHoursRepository.save(openingsHours);
    }

    public void delete(final Long id) {
        openingsHoursRepository.deleteById(id);
    }

    public OpeningsHoursDTO mapToDTO(final OpeningsHours openingsHours) {
        return mapToDTO(openingsHours, new OpeningsHoursDTO());
    }

    private OpeningsHoursDTO mapToDTO(final OpeningsHours openingsHours,
                                      final OpeningsHoursDTO openingsHoursDTO) {
        openingsHoursDTO.setId(openingsHours.getId());
        openingsHoursDTO.setDay(openingsHours.getDay());
        openingsHoursDTO.setOpenTime(openingsHours.getOpenTime());
        openingsHoursDTO.setClosingTime(openingsHours.getClosingTime());
        openingsHoursDTO.setRestaurant(openingsHours.getRestaurantByOpeningsHours() == null ? null : openingsHours.getRestaurantByOpeningsHours().getId());
        return openingsHoursDTO;
    }

    private OpeningsHours mapToEntity(final OpeningsHoursDTO openingsHoursDTO,
                                      final OpeningsHours openingsHours) {
        openingsHours.setDay(openingsHoursDTO.getDay());
        openingsHours.setOpenTime(openingsHoursDTO.getOpenTime());
        openingsHours.setClosingTime(openingsHoursDTO.getClosingTime());
        if (openingsHoursDTO.getRestaurant() != null && (openingsHours.getRestaurantByOpeningsHours() == null || !openingsHours.getRestaurantByOpeningsHours().getId().equals(openingsHoursDTO.getRestaurant()))) {
            final Restaurant restaurantByTable = restaurantRepository.findById(openingsHoursDTO.getRestaurant())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "restaurantByTable not found"));
            openingsHours.setRestaurantByOpeningsHours(restaurantByTable);
        }
        return openingsHours;
    }

}
