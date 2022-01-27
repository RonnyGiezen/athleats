package nl.hva.server.service;

import nl.hva.server.domain.*;
import nl.hva.server.model.*;
import nl.hva.server.repos.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;


@Transactional
@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final DinnertableRepository dinnertableRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final OrderRepository orderRepository;
    private final OrderService orderService;

    public ReservationService(final ReservationRepository reservationRepository,
                              final DinnertableRepository dinnertableRepository,
                              final UserRepository userRepository,
                              final RestaurantRepository restaurantRepository,
                              final OrderRepository orderRepository,
                              final UserService userService,
                              final OrderService orderService) {
        this.reservationRepository = reservationRepository;
        this.dinnertableRepository = dinnertableRepository;
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.orderRepository = orderRepository;
        this.orderService = orderService;
    }

    public List<ReservationDTO> findAll(User user) {
        if (!user.isAdmin()) throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        return reservationRepository.findAll()
                .stream()
                .map(reservation -> mapToDTO(reservation, new ReservationDTO()))
                .collect(Collectors.toList());
    }

    public List<ReservationDTO> findAllByUser(final User user) {
        return reservationRepository.findAll()
                .stream()
                .filter(reservation -> reservation.getOwner().getId().equals(user.getId()))
                .map(reservation -> mapToDTO(reservation, new ReservationDTO()))
                .collect(Collectors.toList());
    }

    public ReservationDTO get(final Long id, User user) {
        final Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!(user.isAdmin() || user.equals(reservation.getOwner()))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        return mapToDTO(reservation, new ReservationDTO());
    }

    public Long create(final ReservationDTO reservationDTO, User user) {
        final Reservation reservation = new Reservation();
        mapToEntity(reservationDTO, reservation);
        reservation.setOwner(user);
        Long id = reservationRepository.save(reservation).getId();
        reservation.setOrdersByReservation(createOrUpdateOrders(reservationDTO, id, user));
        return reservationRepository.save(reservation).getId();
    }


    public void update(final Long id, final ReservationStatusDTO reservationStatusDTO, User user) {
        final Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!(user.isAdmin() || user.equals(reservation.getOwner()))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        reservation.setStatus(reservationStatusDTO.getStatus());
        reservationRepository.save(reservation);
    }

    public void update(final Long id, final ReservationDTO reservationDTO, User user) {
        final Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!(user.isAdmin() || user.equals(reservation.getOwner()))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        mapToEntity(reservationDTO, reservation);
        reservation.setOrdersByReservation(createOrUpdateOrders(reservationDTO, id, user));
        reservationRepository.save(reservation);
    }

    public void delete(final Long id, User user) {
        final Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (!(user.isAdmin() || user.equals(reservation.getOwner()))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        reservationRepository.deleteById(id);
    }

    private HashSet<Order> createOrUpdateOrders(ReservationDTO reservationDTO, Long reservationId, User user) {
        if (reservationDTO.getOrders() != null) {
            final List<Order> ordersByReservation = reservationDTO.getOrders().stream()
                    .map(dto -> {
                        dto.setReservation(reservationId);
                        return orderService.updateOrCreate(dto.getId(), dto, user);
                    }).collect(Collectors.toList());
            if (ordersByReservation.size() != reservationDTO.getOrders().size()) {
                throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED, "one of orders failed");
            }
            return new HashSet<>(ordersByReservation);
        }
        return null;
    }

    private ReservationDTO mapToDTO(final Reservation reservation,
                                    final ReservationDTO reservationDTO) {
        reservationDTO.setId(reservation.getId());
        reservationDTO.setDescription(reservation.getDescription());
        reservationDTO.setType(reservation.getType());
        reservationDTO.setStatus(reservation.getStatus());
        reservationDTO.setBeginTime(reservation.getBeginTime());
        reservationDTO.setEndTime(reservation.getEndTime());
        reservationDTO.setNumberOfPeople(reservation.getNumberOfPeople());
        reservationDTO.setTablesByReservations(reservation.getTablesByReservationDinnertables() == null ? null : reservation.getTablesByReservationDinnertables().stream()
                .map(Dinnertable::getId)
                .collect(Collectors.toList()));
        reservationDTO.setOrders(reservation.getOrdersByReservation() == null ? null : reservation.getOrdersByReservation().stream()
                .map(orderService::mapToDTO)
                .collect(Collectors.toList()));
        reservationDTO.setOwner(reservation.getOwner() == null ? null : mapUserToSanitizedDTO(reservation.getOwner(), new UserSanitizedDTO()));
        reservationDTO.setRestaurantByReservation(reservation.getRestaurantByReservation() == null ? null : reservation.getRestaurantByReservation().getId());
        return reservationDTO;
    }

    public UserSanitizedDTO mapUserToSanitizedDTO(final User user, final UserSanitizedDTO userSanitizedDTO) {
        userSanitizedDTO.setId(user.getId());
        userSanitizedDTO.setUsername(user.getUsername());
        return userSanitizedDTO;
    }

    private Reservation mapToEntity(final ReservationDTO reservationDTO,
                                    final Reservation reservation) {
        reservation.setDescription(reservationDTO.getDescription());
        reservation.setType(reservationDTO.getType());
        reservation.setStatus(reservationDTO.getStatus() != null ? reservationDTO.getStatus() : ReservationStatus.PENDING);
        reservation.setBeginTime(reservationDTO.getBeginTime());
        reservation.setEndTime(reservationDTO.getEndTime());
        reservation.setNumberOfPeople(reservationDTO.getNumberOfPeople());
        if (reservationDTO.getTablesByReservations() != null) {
            final List<Dinnertable> tablesByReservations = dinnertableRepository.findAllById(reservationDTO.getTablesByReservations());
            if (tablesByReservations.size() != reservationDTO.getTablesByReservations().size()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "one of tablesByReservations not found");
            }
            reservation.setTablesByReservationDinnertables(tablesByReservations.stream().collect(Collectors.toSet()));
        }
        if (reservationDTO.getOwner() != null && (reservation.getOwner() == null || !reservation.getOwner().getId().equals(reservationDTO.getOwner()))) {
            final User owner = userRepository.findById(reservationDTO.getOwner().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "owner not found"));
            reservation.setOwner(owner);
        }
        if (reservationDTO.getRestaurantByReservation() != null && (reservation.getRestaurantByReservation() == null || !reservation.getRestaurantByReservation().getId().equals(reservationDTO.getRestaurantByReservation()))) {
            final Restaurant restaurantByReservation = restaurantRepository.findById(reservationDTO.getRestaurantByReservation())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "restaurantByReservation not found"));
            reservation.setRestaurantByReservation(restaurantByReservation);
        }
        return reservation;
    }

}
