package nl.hva.server.service.mock;

import nl.hva.server.model.OpeningsHoursDTO;

import java.time.DayOfWeek;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class OpeningsHoursMock {
    public static Set<OpeningsHoursDTO> randomList(long[] restaurants) {
        Set<OpeningsHoursDTO> dtoSet = new HashSet<>();
        for (long restaurant : restaurants) {
            Arrays.stream(DayOfWeek.values()).limit(5).forEach(day -> {
                OpeningsHoursDTO openingsHoursDTO = new OpeningsHoursDTO();
                openingsHoursDTO.setDay(day);
                openingsHoursDTO.setOpenTime("9AM");
                openingsHoursDTO.setClosingTime(day.equals(DayOfWeek.FRIDAY) ? "10PM" : "8PM");
                openingsHoursDTO.setRestaurant(restaurant);
                dtoSet.add(openingsHoursDTO);
            });
        }
        return dtoSet;
    }
}
