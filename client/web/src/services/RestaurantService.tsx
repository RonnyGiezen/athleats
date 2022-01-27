import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = '/restaurants';

class RestaurantService {
    getRestaurants() {
        // @ts-ignore
        return axios.get(API_URL+"/find", { headers: authHeader() });
    }
}

export default new RestaurantService();
