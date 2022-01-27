class RestaurantDTO {
    id: number;
    name: string;
    location: string;
    isClosedTemp: boolean;

    constructor(
        id: number,
        name: string,
        location: string,
        isClosedTemp: boolean ) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.isClosedTemp = isClosedTemp;
    }
}

export default RestaurantDTO;
