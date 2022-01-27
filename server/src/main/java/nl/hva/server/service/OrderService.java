package nl.hva.server.service;

import java.util.List;
import java.util.stream.Collectors;

import nl.hva.server.domain.MenuItem;
import nl.hva.server.domain.Order;
import nl.hva.server.domain.Reservation;
import nl.hva.server.domain.User;
import nl.hva.server.model.MenuItemDTO;
import nl.hva.server.model.OrderDTO;
import nl.hva.server.repos.MenuItemRepository;
import nl.hva.server.repos.OrderRepository;
import nl.hva.server.repos.ReservationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ReservationRepository reservationRepository;
    private final MenuItemRepository menuItemRepository;

    public OrderService(final OrderRepository orderRepository,
                        final ReservationRepository reservationRepository,
                        final MenuItemRepository menuItemRepository) {
        this.orderRepository = orderRepository;
        this.reservationRepository = reservationRepository;
        this.menuItemRepository = menuItemRepository;
    }

    public List<OrderDTO> findAllByReservationId(final Long id, User user) {
        return orderRepository.findAll()
                .stream()
                .filter(order -> user.isAdmin()
                        || user.equals(order.getOrdersByReservation().getOwner())
                        || order.getOrdersByReservation().getId().equals(id))
                .map(order -> mapToDTO(order, new OrderDTO()))
                .collect(Collectors.toList());
    }

    public OrderDTO get(final Long id, User user) {
        return orderRepository.findById(id)
                .filter(order -> user.equals(order.getOrdersByReservation().getOwner()) || user.isAdmin())
                .map(order -> mapToDTO(order, new OrderDTO()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Order updateOrCreate(final Long id, OrderDTO orderDTO, User user) {
        try {
            return update(id, orderDTO, user);
        } catch (ResponseStatusException e) {
            if (e.getStatus().equals(HttpStatus.NOT_FOUND)
            || e.getStatus().equals(HttpStatus.BAD_REQUEST)) {
                return create(orderDTO, user);
            }
            throw e;
        }
    }

    public Order create(final OrderDTO orderDTO, User user) {
        final Order order = new Order();
        mapToEntity(orderDTO, order);
        if (!user.equals(order.getOrdersByReservation().getOwner())
                || !order.getMenuItemByOrder().getRestaurantByMenuItem()
                .equals(order.getOrdersByReservation().getRestaurantByReservation())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Reservation not of owner or menuitem not of restaurant");
        }
        return orderRepository.save(order);
    }

    public Order update(final Long id, final OrderDTO orderDTO, User user) {
        if (id == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        final Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(order.getOrdersByReservation().getOwner())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        mapToEntity(orderDTO, order);
        orderRepository.save(order);
        return order;
    }

    public void delete(final Long id, User user) {
        final Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!user.equals(order.getOrdersByReservation().getOwner())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        orderRepository.deleteById(id);
    }

    public OrderDTO mapToDTO(final Order order) {
        return mapToDTO(order, new OrderDTO());
    }

    private OrderDTO mapToDTO(final Order order, final OrderDTO orderDTO) {
        orderDTO.setId(order.getId());
        orderDTO.setNote(order.getNote());
        orderDTO.setReservation(order.getOrdersByReservation() == null ? null : order.getOrdersByReservation().getId());
        orderDTO.setMenuItem(order.getMenuItemByOrder() == null ? null : order.getMenuItemByOrder().getId());
        orderDTO.setMenuItemObj(order.getMenuItemByOrder() == null ? null : mapToDTO(menuItemRepository.findById(order.getMenuItemByOrder().getId()).orElse(null)));
        return orderDTO;
    }

    private MenuItemDTO mapToDTO(final MenuItem menuItem) {
        if (menuItem == null) return null;
        MenuItemDTO menuItemDTO = new MenuItemDTO();
        menuItemDTO.setId(menuItem.getId());
        menuItemDTO.setNaam(menuItem.getNaam());
        menuItemDTO.setType(menuItem.getType());
        menuItemDTO.setPrice(menuItem.getPrice());
        return menuItemDTO;
    }

    public Order mapToEntity(final OrderDTO orderDTO) {
        return mapToEntity(orderDTO, new Order());
    }

    private Order mapToEntity(final OrderDTO orderDTO, final Order order) {
        order.setNote(orderDTO.getNote());
        if (orderDTO.getReservation() != null
                && (order.getOrdersByReservation() == null
                || !order.getOrdersByReservation().getId().equals(orderDTO.getReservation()))) {
            final Reservation orderByReservation = reservationRepository.findById(orderDTO.getReservation())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "orderByReservation not found"));
            order.setOrdersByReservation(orderByReservation);
        }
        if (orderDTO.getMenuItem() != null && (order.getMenuItemByOrder() == null
                || !order.getMenuItemByOrder().getId().equals(orderDTO.getMenuItem()))) {
            final MenuItem menuItemByOrder = menuItemRepository.findById(orderDTO.getMenuItem())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "menuItemByOrder not found"));
            order.setMenuItemByOrder(menuItemByOrder);
        }
        return order;
    }

}
