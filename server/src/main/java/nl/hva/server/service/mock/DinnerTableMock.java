package nl.hva.server.service.mock;

import nl.hva.server.model.DinnertableDTO;
import nl.hva.server.model.TableType;

import java.util.*;

public class DinnerTableMock {
    public static Set<DinnertableDTO> randomList(int amount, long[] restaurants){
        Set<DinnertableDTO> dtoSet = new HashSet<>();
        for(long restaurant: restaurants){
            for (int i = 0; i < amount - 1; i++){
                DinnertableDTO dinnertableDTO = new DinnertableDTO();
                dinnertableDTO.setType(randomType());
                dinnertableDTO.setRestaurantByTable(restaurant);
                dinnertableDTO.setSeats(new Random().nextInt(6)+2);
                dtoSet.add(dinnertableDTO);
            }
        }
        return dtoSet;
    }

    static TableType randomType(){
        return TableType.values()[new Random().nextInt(TableType.values().length)];
    }
}
