import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import RestaurantService from "../services/RestaurantService";
import ReservationService from "../services/ReservationService";
import RestaurantDTO from "../domains/RestaurantDTO";
import ReservationDTO from "../domains/ReservationDTO";
import {
    Tabs,
    Tab,
    Accordion,
    Dropdown,
    Badge,
} from "react-bootstrap";
import OrderDTO from "../domains/OrderDTO";
import reservationService from "../services/ReservationService";

function Dashboard() {
    const [restaurants, setRestaurants] = useState([]);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const func = async () => {
            const resta = await RestaurantService.getRestaurants();
            const reser = await ReservationService.getReservations();
            setRestaurants(resta.data);
            setReservations(reser.data);
        }
        func();
    }, []);

    return (
        <div>
            <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                {!!restaurants && restaurants.map((restaurant: RestaurantDTO) => {
                    const reserves = reservations.filter((r: ReservationDTO) => r.restaurantByReservation === restaurant.id);
                    return (<Tab key={"TAB" + restaurant.id} eventKey={restaurant.name} title={restaurant.name}
                                 className={"pending_reservations"}
                                 data-pending={reserves.filter((r: ReservationDTO) => r.status === "PENDING").length}
                    >
                        <ChildComponent reservations={reserves}/>
                    </Tab>);
                })}
            </Tabs>
        </div>
    );
}

const ChildComponent = (props: any) => {
    return (
        <div>
            <Accordion defaultActiveKey="0">
                {props.reservations.map((reservation: ReservationDTO, index: string) => {
                    return (
                        <CustomAccordionItem reservation={reservation} index={index}/>
                    );
                })}
            </Accordion>
        </div>
    )
}

const CustomAccordionItem = (props: any) => {
    const [status, setStatus] = useState(props.status);
    const reservation: ReservationDTO = props.reservation;
    return (
        <Accordion.Item key={"I" + reservation.id} eventKey={props.index}>
            <CustomAccordionHeader key={"H" + reservation.id} reservation={reservation}
                                   status={status}/>
            <CustomAccordionBody key={"B" + reservation.id} reservation={reservation}
                                 setStatus={setStatus}/>
        </Accordion.Item>
    );
}

const CustomAccordionHeader = (props: any) => {
    const reservation: ReservationDTO = props.reservation;
    return (
        <Accordion.Header>
            <StatusBadge status={props.status}/>
            <div>{reservation.owner.username}</div>
            <div style={{color: 'var(--bs-gray-500)'}}>{getDay(reservation.beginTime)}</div>
        </Accordion.Header>
    );
};

const CustomAccordionBody = (props: any) => {
    const reservation: ReservationDTO = props.reservation;
    return (
        <Accordion.Body style={{textAlign: "left"}}>

            <table className="receipt">
                <tbody>
                <ReservationInformation reservation={reservation}/>
                <OrderList orders={reservation.orders}/>
                <tr>
                    <td colSpan={5} style={{textAlign: "right", paddingTop: "1.8em"}}>
                        <StatusDropdown id={reservation.id} status={reservation.status} setStatus={props.setStatus}/></td>
                </tr>
                </tbody>
            </table>

        </Accordion.Body>);
};

const ReservationInformation = (props: any) => {
    const reservation: ReservationDTO = props.reservation;
    return (
        <>
            <tr className="infoColumn">
                <td colSpan={5}><h3>{reservation.type}</h3></td>
            </tr>
            <tr className="infoColumn">
                <td colSpan={5}>
                    <div>Name: {reservation.owner.username}</div>
                </td>
            </tr>
            <tr className="infoColumn">
                <td colSpan={5}>
                    <div>Reserved at: {getDay(reservation.beginTime)}</div>
                </td>
            </tr>
            <tr className="infoColumn">
                <td colSpan={5}>
                    <div>Description: {reservation.description ? reservation.description : "No description"}</div>
                </td>
            </tr>
            <tr className="infoColumn">
                <td colSpan={5}>
                    <div>Number of people: {reservation.numberOfPeople}</div>
                </td>
            </tr>
        </>
    );
};


const StatusDropdown = (props: any) => {
    const values = [
        {name: 'Confirmed', value: 'CONFIRMED', color: "success"},
        {name: 'Pending', value: 'PENDING', color: "warning"},
        {name: 'Finished', value: 'FINISHED', color: "info"},
        {name: 'Cancelled', value: 'CANCELLED', color: "secondary"},
    ];

    const [dropdownValue, setDropdownValue] = useState('PENDING');
    const [color, setColor] = useState("danger");

    const setStatusLocal = props.setStatus;
    useEffect(() => {
        const func = async () => {
            await setDropdownValue(props.status);
            console.log(props.status);
        }
        func();
    }, [props.status])

    const changeDropdownValue = (value: string) => {
        setDropdownValue(value);
        reservationService.updateReservationStatus(props.id, value)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });

    };

    useEffect(() => {
        const changeColor = () => {
            setColor(
                dropdownValue === "CONFIRMED" ? "success" :
                    dropdownValue === "PENDING" ? "warning" :
                        dropdownValue === "CANCELLED" ? "secondary" :
                            dropdownValue === "FINISHED" ? "info" :
                                "danger");
            setStatusLocal(dropdownValue);
        }
        changeColor();
    }, [dropdownValue, setStatusLocal]);
    return (
        <Dropdown>
            <Dropdown.Toggle variant={color} id="dropdown-basic">
                {dropdownValue}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {!!values && values.filter(r => r.value !== dropdownValue).map(value => {
                    return (
                        <Dropdown.Item onClick={({target}: React.MouseEvent<HTMLButtonElement>) => {
                            changeDropdownValue((target as HTMLElement).getAttribute("value") || dropdownValue);
                        }} value={value.value}>{value.name}</Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

const StatusBadge = (props: any) => {
    const color: string =
        props.status === "CONFIRMED" ? "success" :
            props.status === "PENDING" ? "warning" :
                props.status === "CANCELLED" ? "secondary" :
                    props.status === "FINISHED" ? "info" :
                        "danger";
    return (
        <Badge bg={color}>
            {props.status}
        </Badge>
    );
};

const getDay = (datetime: string) => {
    let date = new Date(Date.parse(datetime));
    return date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
};

const OrderList = (props: any) => {
    let orders: OrderDTO[] = props.orders;
    orders = orders.sort((a: OrderDTO, b: OrderDTO) => (a.menuItem - b.menuItem) || (a.note ? null : -1) || (a.note.localeCompare(b.note))).reduce((accumulator: OrderDTO[], currentValue) => {
        if (accumulator.length > 0 && currentValue.menuItem === accumulator[accumulator.length - 1].menuItem && currentValue.note === accumulator[accumulator.length - 1].note) {
            accumulator[accumulator.length - 1].amount++;
        } else {
            currentValue.amount = 1;
            accumulator.push(currentValue);
        }
        return accumulator;
    }, []);

    const total: number = orders.reduce((accumulator, currentValue) => accumulator + (currentValue.amount * currentValue.menuItemObj.price), 0);
    return (
        <>
            {!!orders && orders.map((order: OrderDTO) => {
                return (
                    <OrderLine order={order}/>
                );
            })}
            <TotalLine total={total}/>
        </>
    );
}

const OrderLine = (props: any) => {
    let order: OrderDTO = props.order;
    return (
        <tr className="orderline">
            <td>{order.amount}</td>
            <td>x</td>
            <td className={(!!order.note ? "note" : "")}>{order.menuItemObj.naam}
                <span>{!!order.note ? order.note : ""}</span></td>
            <td>{order.menuItemObj.price}</td>
            <td>{(order.menuItemObj.price * order.amount).toFixed(2)}</td>
        </tr>
    );
}

const TotalLine = (props: any) => {
    return (
        <>
            <tr className="totalrow">
                <td colSpan={3}>Total:</td>
                <td colSpan={2}>€{(props.total).toFixed(2)}</td>
            </tr>
            <tr className="btwrow">
                <td colSpan={3}>Btw:</td>
                <td colSpan={2}>€{(props.total * 0.09).toFixed(2)}</td>
            </tr>
        </>
    );
}

export default Dashboard;
