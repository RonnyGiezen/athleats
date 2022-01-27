package nl.hva.server.repos;

import nl.hva.server.domain.OpeningsHours;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OpeningsHoursRepository extends JpaRepository<OpeningsHours, Long> {
}
