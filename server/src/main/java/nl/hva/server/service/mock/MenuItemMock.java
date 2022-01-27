package nl.hva.server.service.mock;

import nl.hva.server.model.FoodType;
import nl.hva.server.model.MenuItemDTO;

import java.util.*;
import java.util.stream.Collectors;

public class MenuItemMock {
    private static final List<Item> ITEMPOOL = List.of(
            new Item("Burger w/ Fries", FoodType.LUNCH),
            new Item("Steak Sandwich", FoodType.LUNCH),
            new Item("Mushroom Soup", FoodType.LUNCH),
            new Item("Eggs Benedict", FoodType.BREAKFAST),
            new Item("Classic Breakfast", FoodType.BREAKFAST),
            new Item("British Breakfast", FoodType.BREAKFAST),
            new Item("Spaghetti Bolognese", FoodType.DINNER),
            new Item("Veal Cutlet with Chicken Mushroom Rotini", FoodType.DINNER),
            new Item("Steak Frites", FoodType.DINNER),
            new Item("Coffee", FoodType.DRINKS),
            new Item("Tea", FoodType.DRINKS),
            new Item("Modelo", FoodType.DRINKS),
            new Item("Coke", FoodType.DRINKS),
            new Item("Fanta", FoodType.DRINKS),
            new Item("Casis", FoodType.DRINKS),
            new Item("Coke Zero", FoodType.DRINKS)
            );

    public static Set<MenuItemDTO> randomList(int amount, long[] restaurants){
        Set<MenuItemDTO> dtoSet = new HashSet<>();
        for(long restaurant: restaurants){
            ITEMPOOL.stream()
                    .collect(Collectors.collectingAndThen(Collectors.toList(), collected -> {
                        Collections.shuffle(collected);
                        return collected.stream();
                    }))
                    .limit(amount)
                    .forEach(item -> {
                MenuItemDTO restaurantDTO = new MenuItemDTO();
                restaurantDTO.setNaam(item.name);
                restaurantDTO.setType(item.type);
                restaurantDTO.setPrice(Math.round(new Random().nextDouble()*1000)/100d);
                restaurantDTO.setMenuItemByRestaurant(restaurant);
                dtoSet.add(restaurantDTO);
            });
        }
        return dtoSet;
    }

    static class Item{
        public String name;
        public FoodType type;
        public Item(String name, FoodType type){
            this.name = name;
            this.type = type;
        }
    }
}
