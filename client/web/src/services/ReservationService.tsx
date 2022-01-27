import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = '/reservations';

class ReservationService {
    getReservations() {
        // @ts-ignore
        return axios.get(API_URL+"/all", { headers: authHeader() });
    }

    updateReservationStatus(id: number, status: string){
        return axios.put(API_URL+"/status/"+id, {
            status: status
        // @ts-ignore
        }, { headers: authHeader()})
    }
}

export default new ReservationService();
