package nl.hva.server.service.mock;

import nl.hva.server.domain.User;
import nl.hva.server.model.*;
import nl.hva.server.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Component
public class AdminUserService {
    private final static LocalDateTime NOW = LocalDateTime.now();
    private final static LocalDateTime TOMORROW = LocalDateTime.now().plusDays(1);
    private final static LocalDateTime DAY_AFTER_TOMORROW = LocalDateTime.now().plusDays(2);


    @Autowired
    private JwtUserDetailsService userService;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private MenuItemService menuItemService;

    @EventListener(ApplicationReadyEvent.class)
    @Order(10)
    public void fillDatabase() {
        User admin = adminUser();
//        reservation(admin, ReservationType.TAKE_AWAY, ReservationStatus.PENDING, NOW, 4, 10001L);
//        reservation(admin, ReservationType.SIT_AND_EAT, ReservationStatus.CANCELLED, TOMORROW, 8, 10001L);
//        reservation(admin, ReservationType.TAKE_AWAY, ReservationStatus.CONFIRMED, DAY_AFTER_TOMORROW, 2, 10001L);
//        reservation(admin, ReservationType.TAKE_AWAY, ReservationStatus.PENDING, NOW, 5, 10002L);
    }

    public User adminUser() {
        UserDTO dto = new UserDTO();
        dto.setUsername("athleats");
        dto.setPassword("athleats");
        dto.setEmail("athleats@athleats.com");
        dto.setUserRole(UserRole.ADMIN);
        return this.userService.save(dto);
    }

    public void reservation(User user, ReservationType type, ReservationStatus status, LocalDateTime time, int people, Long restaurant) {
        ReservationDTO dto = new ReservationDTO();
        dto.setType(type);
        dto.setStatus(status);
        dto.setBeginTime(time);
        dto.setNumberOfPeople(people);
        List<MenuItemDTO> items = menuItemService.findAllByRestaurantId(restaurant);
        List<OrderDTO> allItems = new ArrayList<>();
        for (int i = 0; i < people; i++){
            int size = (new Random().nextInt(items.size() - 1));
            allItems.addAll(items.subList(0, Math.max(size, 0)).stream().map(item -> {
                OrderDTO orderDTO = new OrderDTO();
                orderDTO.setMenuItem(item.getId());
                return orderDTO;
            }).collect(Collectors.toList()));
        }
        allItems.get(new Random().nextInt(allItems.size())).setNote("Veggie style");
        allItems.get(new Random().nextInt(allItems.size())).setNote("No Cheese");
        dto.setOrders(allItems);
        dto.setRestaurantByReservation(restaurant);
        reservationService.create(dto, user);
    }

}
