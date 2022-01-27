class MenuItemDTO {
    id: number;
    naam: string;
    type: string;
    price: number;

    constructor(
        id: number,
        naam: string,
        type: string,
        price: number) {
        this.id = id;
        this.naam = naam;
        this.type = type;
        this.price = price;
    }
}

export default MenuItemDTO;
