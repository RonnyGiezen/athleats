package nl.hva.server.repos;

import nl.hva.server.domain.Dinnertable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DinnertableRepository extends JpaRepository<Dinnertable, Long> {
}
