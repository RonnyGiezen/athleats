package nl.hva.server.repos;

import nl.hva.server.domain.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
}
