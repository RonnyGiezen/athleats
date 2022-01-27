package nl.hva.server.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class DinnertableDTO {

    private Long id;

    @NotNull
    private TableType type;

    @NotNull
    private Integer seats;

    private Long restaurantByTable;

}
