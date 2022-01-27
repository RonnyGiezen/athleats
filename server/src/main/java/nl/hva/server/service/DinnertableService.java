package nl.hva.server.service;

import java.util.List;
import java.util.stream.Collectors;
import nl.hva.server.domain.Dinnertable;
import nl.hva.server.domain.Restaurant;
import nl.hva.server.model.DinnertableDTO;
import nl.hva.server.repos.DinnertableRepository;
import nl.hva.server.repos.RestaurantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class DinnertableService {

    private final DinnertableRepository dinnertableRepository;
    private final RestaurantRepository restaurantRepository;

    public DinnertableService(final DinnertableRepository dinnertableRepository,
            final RestaurantRepository restaurantRepository) {
        this.dinnertableRepository = dinnertableRepository;
        this.restaurantRepository = restaurantRepository;
    }

    public List<DinnertableDTO> findAll() {
        return dinnertableRepository.findAll()
                .stream()
                .map(dinnertable -> mapToDTO(dinnertable, new DinnertableDTO()))
                .collect(Collectors.toList());
    }

    public List<DinnertableDTO> findAllByRestaurantId(final Long id) {
        return dinnertableRepository.findAll()
                .stream()
                .filter(dinnertable -> dinnertable.getRestaurantByDinnerTable().getId().equals(id))
                .map(dinnertable -> mapToDTO(dinnertable, new DinnertableDTO()))
                .collect(Collectors.toList());
    }

    public DinnertableDTO get(final Long id) {
        return dinnertableRepository.findById(id)
                .map(dinnertable -> mapToDTO(dinnertable, new DinnertableDTO()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Long create(final DinnertableDTO dinnertableDTO) {
        final Dinnertable dinnertable = new Dinnertable();
        mapToEntity(dinnertableDTO, dinnertable);
        return dinnertableRepository.save(dinnertable).getId();
    }

    public void update(final Long id, final DinnertableDTO dinnertableDTO) {
        final Dinnertable dinnertable = dinnertableRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        mapToEntity(dinnertableDTO, dinnertable);
        dinnertableRepository.save(dinnertable);
    }

    public void delete(final Long id) {
        dinnertableRepository.deleteById(id);
    }

    private DinnertableDTO mapToDTO(final Dinnertable dinnertable,
            final DinnertableDTO dinnertableDTO) {
        dinnertableDTO.setId(dinnertable.getId());
        dinnertableDTO.setType(dinnertable.getType());
        dinnertableDTO.setSeats(dinnertable.getSeats());
        dinnertableDTO.setRestaurantByTable(dinnertable.getRestaurantByDinnerTable() == null ? null : dinnertable.getRestaurantByDinnerTable().getId());
        return dinnertableDTO;
    }

    private Dinnertable mapToEntity(final DinnertableDTO dinnertableDTO,
            final Dinnertable dinnertable) {
        dinnertable.setType(dinnertableDTO.getType());
        dinnertable.setSeats(dinnertableDTO.getSeats());
        if (dinnertableDTO.getRestaurantByTable() != null && (dinnertable.getRestaurantByDinnerTable() == null || !dinnertable.getRestaurantByDinnerTable().getId().equals(dinnertableDTO.getRestaurantByTable()))) {
            final Restaurant restaurantByTable = restaurantRepository.findById(dinnertableDTO.getRestaurantByTable())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "restaurantByTable not found"));
            dinnertable.setRestaurantByDinnerTable(restaurantByTable);
        }
        return dinnertable;
    }

}
