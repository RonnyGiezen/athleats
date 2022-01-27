import OrderDTO from "./OrderDTO";
import UserDTO from "./UserDTO";

class ReservationDTO {
    id: number;
    description: string;
    type: string;
    status: string;
    beginTime: string;
    endTime: string;
    numberOfPeople: number;
    tablesByReservations: string;
    owner: UserDTO;
    orders: OrderDTO[];
    restaurantByReservation: number;

    constructor(
        id: number,
        description: string,
        type: string,
        status: string,
        beginTime: string,
        endTime: string,
        numberOfPeople: number,
        tablesByReservations: string,
        owner: UserDTO,
        orders: OrderDTO[],
        restaurantByReservation: number
    ) {
        this.id = id;
        this.description = description;
        this.type = type;
        this.status = status;
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.numberOfPeople = numberOfPeople;
        this.tablesByReservations = tablesByReservations;
        this.owner = owner;
        this.orders = orders;
        this.restaurantByReservation = restaurantByReservation;
    }
}

export default ReservationDTO;
