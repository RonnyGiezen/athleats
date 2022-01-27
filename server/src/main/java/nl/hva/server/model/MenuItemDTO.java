package nl.hva.server.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class MenuItemDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String naam;

    @NotNull
    private FoodType type;

    @NotNull
    private Double price;

    private Long menuItemByRestaurant;

}
