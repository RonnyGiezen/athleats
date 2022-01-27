package nl.hva.server.domain;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.Setter;
import nl.hva.server.model.FoodType;


@Entity
@Getter
@Setter
public class MenuItem {

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
    private String naam;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FoodType type;

    @Column(nullable = false)
    private Double price;

    @OneToMany(mappedBy = "menuItemByOrder")
    private Set<Order> ordersByMenuItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_item_by_restaurant_id")
    private Restaurant restaurantByMenuItem;

}
