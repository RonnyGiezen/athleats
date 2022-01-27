package nl.hva.server.domain;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Restaurant {

    public Restaurant(){

    }

    public Restaurant(String name, String photos, String location, Boolean isClosedTemp) {
        this.name = name;
        this.photos = photos;
        this.location = location;
        this.isClosedTemp = isClosedTemp;
    }

    @Id
    @Column(nullable = false, updatable = false)
    @SequenceGenerator(
            name = "primary_sequence",
            sequenceName = "primary_sequence",
            allocationSize = 1,
            initialValue = 10000
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "primary_sequence"
    )
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String photos;

    @Column(nullable = false)
    private String location;

    @Column
    private Boolean isClosedTemp = false;

    @OneToMany(mappedBy = "restaurantByDinnerTable")
    private Set<Dinnertable> restaurantByTableDinnertables;

    @OneToMany(mappedBy = "restaurantByReservation")
    private Set<Reservation> restaurantByReservationReservations;

    @OneToMany(mappedBy = "restaurantByMenuItem")
    private Set<MenuItem> menuItemsByRestaurant;

    @OneToMany(mappedBy = "restaurantByOpeningsHours")
    private Set<OpeningsHours> openingHoursByRestaurant;

}
