package nl.hva.server.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EntityScan("nl.hva.server.domain")
@EnableJpaRepositories("nl.hva.server.repos")
@EnableTransactionManagement
public class DomainConfig {
}
