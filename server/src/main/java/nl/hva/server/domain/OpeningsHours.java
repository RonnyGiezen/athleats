package nl.hva.server.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.OffsetDateTime;


@Entity
@Getter
@Setter
public class OpeningsHours {

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
    private DayOfWeek day;

    @Column(nullable = false)
    private String openTime;

    @Column(nullable = false)
    private String closingTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "openings_hours_by_restaurant")
    private Restaurant restaurantByOpeningsHours;
}
