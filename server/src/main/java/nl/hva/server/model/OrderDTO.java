package nl.hva.server.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OrderDTO {

    private Long id;

    @Size(max = 255)
    private String note;

    private Long reservation;

    @NotNull
    private Long menuItem;

    private MenuItemDTO menuItemObj;
}
