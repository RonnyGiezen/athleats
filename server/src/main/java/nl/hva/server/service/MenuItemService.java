package nl.hva.server.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import nl.hva.server.domain.MenuItem;
import nl.hva.server.domain.Restaurant;
import nl.hva.server.model.MenuItemDTO;
import nl.hva.server.repos.MenuItemRepository;
import nl.hva.server.repos.RestaurantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final RestaurantRepository restaurantRepository;

    public MenuItemService(final MenuItemRepository menuItemRepository,
            final RestaurantRepository restaurantRepository) {
        this.menuItemRepository = menuItemRepository;
        this.restaurantRepository = restaurantRepository;
    }

    public List<MenuItemDTO> findAll() {
        return menuItemRepository.findAll()
                .stream()
                .map(menuItem -> mapToDTO(menuItem, new MenuItemDTO()))
                .collect(Collectors.toList());
    }

    public List<MenuItemDTO> findAllByRestaurantId(final Long id) {
        return menuItemRepository.findAll()
                .stream()
                .filter(menuItem -> Objects.equals(menuItem.getRestaurantByMenuItem().getId(), id))
                .map(menuItem -> mapToDTO(menuItem, new MenuItemDTO()))
                .collect(Collectors.toList());
    }

    public MenuItemDTO get(final Long id) {
        return menuItemRepository.findById(id)
                .map(menuItem -> mapToDTO(menuItem, new MenuItemDTO()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Long create(final MenuItemDTO menuItemDTO) {
        final MenuItem menuItem = new MenuItem();
        mapToEntity(menuItemDTO, menuItem);
        return menuItemRepository.save(menuItem).getId();
    }

    public void update(final Long id, final MenuItemDTO menuItemDTO) {
        final MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        mapToEntity(menuItemDTO, menuItem);
        menuItemRepository.save(menuItem);
    }

    public void delete(final Long id) {
        menuItemRepository.deleteById(id);
    }

    private MenuItemDTO mapToDTO(final MenuItem menuItem, final MenuItemDTO menuItemDTO) {
        menuItemDTO.setId(menuItem.getId());
        menuItemDTO.setNaam(menuItem.getNaam());
        menuItemDTO.setType(menuItem.getType());
        menuItemDTO.setPrice(menuItem.getPrice());
        menuItemDTO.setMenuItemByRestaurant(menuItem.getRestaurantByMenuItem() == null ? null : menuItem.getRestaurantByMenuItem().getId());
        return menuItemDTO;
    }

    private MenuItem mapToEntity(final MenuItemDTO menuItemDTO, final MenuItem menuItem) {
        menuItem.setNaam(menuItemDTO.getNaam());
        menuItem.setType(menuItemDTO.getType());
        menuItem.setPrice(menuItemDTO.getPrice());
        if (menuItemDTO.getMenuItemByRestaurant() != null && (menuItem.getRestaurantByMenuItem() == null || !menuItem.getRestaurantByMenuItem().getId().equals(menuItemDTO.getMenuItemByRestaurant()))) {
            final Restaurant restaurantByMenuItem = restaurantRepository.findById(menuItemDTO.getMenuItemByRestaurant())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "menuItemByRestaurant not found"));
            menuItem.setRestaurantByMenuItem(restaurantByMenuItem);
        }
        return menuItem;
    }

}
