import React, { useEffect, useState } from "react";
import {
    Checkbox,
    Group,
    MultiSelect,
    Text,
} from "@mantine/core";
import './Filter.css';
import axios from "axios";


const Filter = (props) => {
    const [titles, setTitles] = useState([]);
    const [types, setTypes] = useState([]);
    const [gears, setGears] = useState([]);
    const [fuelType, setFuelType] = useState([]);
    const [passengers, setPassengers] = useState([]);

    const getTitles = async () => {
        try {
            const { data } = await axios.get("https://cars-rent-api.herokuapp.com/cars/titles");
            setTitles(data);
        } catch (error) {
            console.log(error);
        }
    }
    const getTypes = async () => {
        try {
            const { data } = await axios.get("https://cars-rent-api.herokuapp.com/cars/types");
            setTypes(data);
        } catch (error) {
            console.log(error);
        }
    };
    const getGears = async () => {
        try {
            const { data } = await axios.get("https://cars-rent-api.herokuapp.com/cars/gearbox");
            setGears(data);
        } catch (error) {
            console.log(error);
        }
    };
    const getFuelType = async () => {
        try {
            const { data } = await axios.get("https://cars-rent-api.herokuapp.com/cars/fuelType");
            setFuelType(data);

        } catch (error) {
            console.log(error);
        }
    };
    const getPassengers = async () => {
        try {
            const { data } = await axios.get("https://cars-rent-api.herokuapp.com/cars/passengers");
            setPassengers(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTitles();
        getTypes();
        getGears();
        getFuelType();
        getPassengers();
    }, []);

    return (
        <>
            <Group direction="column" className="filter">
                <h2>Filter by</h2>
                <MultiSelect
                    data={titles}
                    label="Car"
                    placeholder="Select car"
                    values={props.filters.titles}
                    mb={15}
                    onChange={(values) =>
                        props.setFilters({ ...props.filters, titles: values })
                    }
                />
                <Group direction="column">
                    <Text>Types</Text>
                    {types.map((type, index) => (
                        <Checkbox
                            key={index}
                            value={type}
                            label={props.capitalizeFirstLetter(type)}
                            checked={props.filters.types.includes(type)}
                            onChange={(e) => {
                                if (e.currentTarget.checked) {
                                    props.setFilters({
                                        ...props.filters,
                                        types: [...props.filters.types, type],
                                    });
                                } else {
                                    props.setFilters({
                                        ...props.filters,
                                        types: props.filters.types.filter((t) => t !== type),
                                    });
                                }
                            }}
                        />
                    ))}
                </Group>
                <Group direction="column">
                    <Text>Passengers</Text>
                    {passengers.map((pas, index) => (
                        <Checkbox
                            key={index}
                            value={pas}
                            label={pas}
                            checked={props.filters.passengers.includes(pas)}
                            onChange={(e) => {
                                if (e.currentTarget.checked) {
                                    props.setFilters({
                                        ...props.filters,
                                        passengers: [...props.filters.passengers, pas],
                                    });
                                } else {
                                    props.setFilters({
                                        ...props.filters,
                                        passengers: props.filters.passengers.filter((t) => t !== pas),
                                    });
                                }

                            }}
                        />
                    ))}
                </Group>

                <Group direction="column">
                    <Text>Fuel type</Text>
                    {fuelType.map((type, index) => (
                        <Checkbox
                            key={index}
                            value={type}
                            label={props.capitalizeFirstLetter(type)}
                            checked={props.filters.fuelType.includes(type)}
                            onChange={(e) => {
                                if (e.currentTarget.checked) {
                                    props.setFilters({
                                        ...props.filters,
                                        fuelType: [...props.filters.fuelType, type],
                                    });
                                } else {
                                    props.setFilters({
                                        ...props.filters,
                                        fuelType: props.filters.fuelType.filter((t) => t !== type),
                                    });
                                }

                            }}
                        />
                    ))}
                </Group>

                <Group direction="column">
                    <Text>Type of gearbox</Text>
                    {gears.map((gear, index) => (
                        <Checkbox
                            key={index}
                            value={gear}
                            label={props.capitalizeFirstLetter(gear)}
                            checked={props.filters.gear.includes(gear)}
                            onChange={(e) => {
                                if (e.currentTarget.checked) {
                                    props.setFilters({
                                        ...props.filters,
                                        gear: [...props.filters.gear, gear],
                                    });
                                } else {
                                    props.setFilters({
                                        ...props.filters,
                                        gear: props.filters.gear.filter((i) => i !== gear),
                                    });
                                }

                            }}
                        />
                    ))}
                </Group>
            </Group>

        </>
    )
};
export default Filter;