package nl.hva.server.domain;

import java.util.Set;
import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;
import nl.hva.server.model.UserRole;


@Entity
@Getter
@Setter
public class User {

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
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private UserRole userRole;

    @OneToMany(mappedBy = "owner")
    private Set<Reservation> ownerReservations;

    public boolean isAdmin(){
        return UserRole.ADMIN.equals(getUserRole());
    }

}
