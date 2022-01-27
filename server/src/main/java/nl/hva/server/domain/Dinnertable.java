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
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.Setter;
import nl.hva.server.model.TableType;


@Entity
@Getter
@Setter
public class Dinnertable {

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
    @Enumerated(EnumType.STRING)
    private TableType type;

    @Column(nullable = false)
    private Integer seats;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_by_table_id")
    private Restaurant restaurantByDinnerTable;

    @ManyToMany(mappedBy = "tablesByReservationDinnertables")
    private Set<Reservation> reservationByDinnerTable;

}
