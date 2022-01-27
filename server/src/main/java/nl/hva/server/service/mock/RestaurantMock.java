package nl.hva.server.service.mock;

import nl.hva.server.model.RestaurantDTO;

import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public class RestaurantMock {
    private static String[] NAMES = new String[]{"Meat Monday","Tuesday Tacos", "Wasabi Wednesday", "Thursday Tomato", "Friday Fish"};
    private static String COORDINATES = "52.2124178,5.1900209,17.58z";

    public static Set<RestaurantDTO> randomList(int amount){
        Set<RestaurantDTO> dtoSet = new HashSet<>();
        for (int i = 0; i < amount-1; i++){
            RestaurantDTO restaurantDTO = new RestaurantDTO();
            restaurantDTO.setName(NAMES[i]);
            restaurantDTO.setPhotos("https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-oranges-ice-600x750.jpg");
            restaurantDTO.setLocation(COORDINATES);
            restaurantDTO.setIsClosedTemp((Math.random()>0.5));

            dtoSet.add(restaurantDTO);
        }
        return dtoSet;
    }

    public static String randomName(){
        return NAMES[new Random().nextInt(NAMES.length)];
    }
}
