package nl.hva.server.service.mock;

import nl.hva.server.service.DinnertableService;
import nl.hva.server.service.MenuItemService;
import nl.hva.server.service.OpeningsHoursService;
import nl.hva.server.service.RestaurantService;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
public class MockService {
    private final RestaurantService restaurantService;
    private final MenuItemService menuItemService;
    private final DinnertableService dinnertableService;
    private final OpeningsHoursService openingsHoursService;

    public MockService(
            final RestaurantService restaurantService,
            final MenuItemService menuItemService,
            final DinnertableService dinnertableService,
            final OpeningsHoursService openingsHoursService){

        this.restaurantService = restaurantService;
        this.menuItemService = menuItemService;
        this.dinnertableService = dinnertableService;
        this.openingsHoursService = openingsHoursService;
    }


    @EventListener(ApplicationReadyEvent.class)
    @Order(1)
    public void fillDatabase(){
//        long[] restaurants = RestaurantMock.randomList(5).stream().mapToLong(restaurantService::create).toArray();
//        long[] menuItems = MenuItemMock.randomList(8, restaurants).stream().mapToLong(menuItemService::create).toArray();
//        long[] dinnerTables = DinnerTableMock.randomList(15, restaurants).stream().mapToLong(dinnertableService::create).toArray();
//        long[] openingHours = OpeningsHoursMock.randomList(restaurants).stream().mapToLong(openingsHoursService::create).toArray();
    }



}
