import React, {useState, createContext, useEffect, useContext} from "react";

import {
    restaurantsRequestApi,
} from "./restaurants.service";

import {LocationContext} from "../location/location.context";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({children}) => {
    const [keyword, setKeyword] = useState("");
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {location} = useContext(LocationContext);


    const onSearch = (searchKeyword) => {
        setIsLoading(true);
        setKeyword(searchKeyword);
    };

    const retrieveRestaurants = () => {
        setIsLoading(true);
        setAllRestaurants([]);

        restaurantsRequestApi()
            .then((responseJson) => {
                console.log(responseJson);
                setIsLoading(false);
                setAllRestaurants(responseJson);
                setRestaurants(responseJson);
            })
            .catch((error) => {
                setError(error);
            });
    };

    useEffect(() => {
        if (location) {
            const locationString = `${location.lat},${location.lng}`;
            retrieveRestaurants(locationString);
        }
    }, [location]);

    useEffect(() => {
        if (!keyword.length) {
            setRestaurants(allRestaurants);
            setIsLoading(false)
            return;
        }
        setRestaurants(allRestaurants.filter((restaurant) => {
            return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
        }));
        setIsLoading(false);
    }, [keyword]);

    return (
        <RestaurantsContext.Provider value={{restaurants, isLoading, error, search: onSearch}}>
            {children}
        </RestaurantsContext.Provider>
    );
};
