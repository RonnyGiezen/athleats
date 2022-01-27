import MenuItemDTO from "./MenuItemDTO";

class OrderDTO {
    id: number;
    note: string;
    reservation: number;
    menuItem: number;
    amount: number;
    menuItemObj: MenuItemDTO;

    constructor(
        id: number,
        note: string,
        reservation: number,
        menuItem: number,
        menuItemObj: MenuItemDTO) {
        this.id = id;
        this.note = note;
        this.reservation = reservation;
        this.menuItem = menuItem;
        this.amount = -1;
        this.menuItemObj = menuItemObj;
    }
}

export default OrderDTO;
