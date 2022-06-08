import React, { useState, useEffect } from "react";
import './HomePage.css';
import axios from "axios";
import { ActionIcon, Container, createStyles, Drawer, Grid, Group, LoadingOverlay, Pagination, Text, TextInput } from "@mantine/core";
import Filter from "../../components/Filter/Filter";
import ProductCard from "../../components/ProductCard/ProductCard";
import ContactUs from "../../components/ContactUs/ContactUs";
import HeaderHero from "../../components/HeaderHero/HeaderHero";
import { useMediaQuery } from "@mantine/hooks";
import { Filter as FilterIcon } from "tabler-icons-react";
import { useWindowScroll } from '@mantine/hooks';


const useStyles = createStyles((theme) => ({
    filtersContainer: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
}));



// const products = [
//     {
//         image: "corolla_estate_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/toyota/corolla_lrg.jpg',
//         title: "Toyota",
//         model: "Corolla",
//         typeCar: "Hatchback",
//         discount: "15% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "8 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: '123.00$',
//     },
//     {
//         image: "3_series_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/bmw/3_series_lrg.jpg',
//         title: "BMW",
//         model: "3 Series",
//         typeCar: "Sedan",
//         discount: "5% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "9 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Diesel", icon: GasStation },
//         ],
//         price: "120.00$",
//     },
//     {
//         image: "a7_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/audi/a7_lrg.jpg',
//         title: "Audi",
//         model: "A7",
//         typeCar: "Sedan",
//         discount: "8% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "11 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "160.00$",
//     },
//     {
//         image: "t-cross_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/volkswagen/touareg_lrg.jpg',
//         title: "Volkswagen",
//         model: "Touareg",
//         typeCar: "SUV",
//         discount: "15% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "12 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "168.00$",
//     },
//     {
//         image: "patrol_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/nissan/patrol_lrg.jpg',
//         title: "Nissan",
//         model: "Patrol",
//         typeCar: "SUV",
//         discount: "15% off",
//         features: [
//             { passengers: 7, icon: Users },
//             { consumption: "15 LITERS/100 km", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Diesel", icon: GasStation },
//         ],
//         price: "194.00$",
//     },
//     {
//         image: "optima_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/kia/optima_lrg.jpg',

//         title: "Kia",
//         model: "Optima",
//         typeCar: "Sedan",
//         discount: "13% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "10 LITERS/100 km", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Patrol", icon: GasStation },
//         ],
//         price: "150.00$",
//     },
//     {
//         image: "e_class_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/mercedes/e_class_lrg.jpg',
//         title: "Mercedes-Benz",
//         model: "E-Class",
//         typeCar: "Sedan",
//         discount: "12% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "11 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Diesel", icon: GasStation },
//         ],
//         price: "143.00$",
//     },
//     {
//         image: "3_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/mazda/3_lrg.jpg',
//         title: "Mazda",
//         model: "3",
//         typeCar: "Hatchback",
//         discount: "8% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "8 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "168.00$",
//     },
//     {
//         image: "outlander_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/mitsubishi/outlander_lrg.jpg',
//         title: "Mitsubishi",
//         model: "Outlander",
//         typeCar: "SUV",
//         discount: "10% off",
//         features: [
//             { passengers: "5", icon: Users },
//             { consumption: "11 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "168.00$",
//     },
//     {
//         image: "fortuner_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/toyota/fortuner_lrg.jpg',
//         title: "Toyota",
//         model: "Fortuner",
//         typeCar: "SUV",
//         discount: "25% off",
//         features: [
//             { passengers: 7, icon: Users },
//             { consumption: "14 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Diesel", icon: GasStation },
//         ],
//         price: "168.00$",
//     },
//     {
//         image: "hiace_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/toyota/hiace_lrg.jpg',
//         title: "Toyota",
//         model: "HiAce",
//         typeCar: "MPV",
//         discount: "25% off",
//         features: [
//             { passengers: 12, icon: Users },
//             { consumption: "15 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Manual", icon: ManualGearbox },
//             { fuelType: "Diesel", icon: GasStation },
//         ],
//         price: "168.00$",
//     },
//     {
//         image: "odyssey_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/honda/odyssey_lrg.jpg',
//         title: "Honda",
//         model: "Odyssey",
//         typeCar: "MPV",
//         discount: "25% off",
//         features: [
//             { passengers: 7, icon: Users },
//             { consumption: "12 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "168.00$",
//     },
//     {
//         image: "adam_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/opel/adam_lrg.jpg',
//         title: "Opel",
//         model: "Adam",
//         typeCar: "Coupe",
//         discount: "25% off",
//         features: [
//             { passengers: 4, icon: Users },
//             { consumption: "6 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Manual", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "90.00$",
//     },
//     {
//         image: "208_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/peugeot/208_lrg.jpg',
//         title: "Peugeot",
//         model: "208",
//         typeCar: "Coupe",
//         discount: "25% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "6 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Manual", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "168.00$",
//     },
//     {
//         image: "500_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/fiat/500_lrg.jpg',
//         title: "Fiat",
//         model: "500",
//         typeCar: "Coupe",
//         discount: "15% off",
//         features: [
//             { passengers: 4, icon: Users },
//             { consumption: "N/A LITERS/100 KM", icon: Gauge },
//             { gearbox: "Manual", icon: ManualGearbox },
//             { fuelType: "Electric", icon: GasStation },
//         ],
//         price: "85.00$",
//     },
//     {
//         image: "s90_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/volvo/s90_lrg.jpg',
//         title: "Volvo",
//         model: "S90",
//         typeCar: "Sedan",
//         discount: "20% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "10 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "175.00$",
//     },
//     {
//         image: "xc90_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/volvo/xc90_lrg.jpg',
//         title: "Volvo",
//         model: " C90",
//         typeCar: "SUV",
//         discount: "23% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "11 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "190.00$",
//     },
//     {
//         image: "glc_lrg",
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/mercedes/glc_lrg.jpg',
//         title: "Mercedes",
//         model: "GLC",
//         typeCar: "SUV",
//         discount: "15% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "10 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Diesel", icon: GasStation },
//         ],
//         price: "170.00$",
//     },
//     {
//         image: 'trafic_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/renault/trafic_lrg.jpg',
//         title: "Renault",
//         model: "Trafic",
//         typeCar: "MPV",
//         discount: "10% off",
//         features: [
//             { passengers: 4, icon: Users },
//             { consumption: "11 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Manual", icon: ManualGearbox },
//             { fuelType: "Diesel", icon: GasStation },
//         ],
//         price: "125.00$",
//     },
//     {
//         image: 'focus_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/ford/focus_lrg.jpg',
//         title: "Ford",
//         model: "Focus",
//         typeCar: "Hatchback",
//         discount: "6% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "9 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Manual", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "77.00$",
//     },
//     {
//         image: 'qashqai_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/nissan/qashqai_lrg.jpg',
//         title: "Nissan",
//         model: "Qashqai",
//         typeCar: "SUV",
//         discount: "6% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "10 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "90.00$",
//     },
//     {
//         image: 'c_class_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/mercedes/c_class_lrg.jpg',
//         title: "Mercedes-Benz",
//         model: "C-Class",
//         typeCar: "Sedan",
//         discount: "10% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "10 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Diesel", icon: GasStation },
//         ],
//         price: "189.00$",
//     },
//     {
//         image: 'charger_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/dodge/charger_lrg.jpg',
//         title: "Dodge",
//         model: "Charger",
//         typeCar: "Sedan",
//         discount: "12% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "16 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "139.00$",
//     },
//     {
//         image: 'carnival_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/kia/carnival_lrg.jpg',
//         title: "Kia",
//         model: "Carnival",
//         typeCar: "MPV",
//         discount: "14% off",
//         features: [
//             { passengers: 7, icon: Users },
//             { consumption: "15 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "169.00$",
//     },
//     {
//         image: '7_series_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/bmw/7_series_lrg.jpg',
//         title: "BMW",
//         model: "7 series",
//         typeCar: "Sedan",
//         discount: "15% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "14 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "280.00$",
//     },
//     {
//         image: '911_coupe_lrg',
//         img: 'https://res.cloudinary.com/strive-tetiana-yaremko/image/upload/v1654355441/cars/911_coupe_lrg_amrsop.jpg',
//         title: "Porsche",
//         model: "911 Coupe",
//         typeCar: "Coupe",
//         discount: "15% off",
//         features: [
//             { passengers: 2, icon: Users },
//             { consumption: "11 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "397.00$",
//     },
//     {
//         image: 'twingo_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/renault/twingo_lrg.jpg',
//         title: "Renault",
//         model: "Twingo",
//         typeCar: "Coupe",
//         discount: "20% off",
//         features: [
//             { passengers: 4, icon: Users },
//             { consumption: "5 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Manual", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "87.00$",
//     },
//     {
//         image: '2008_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/peugeot/2008_lrg.jpg',
//         title: "Peugeot",
//         model: "2008",
//         typeCar: "Hatchback",
//         discount: "20% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "8 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Manual", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "123.00$",
//     },
//     {
//         image: 'ux_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/new_images/lexus/ux_lrg.jpg',
//         title: "Lexus",
//         model: "UX",
//         typeCar: "SUV",
//         discount: "15% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "5 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Hybrid", icon: GasStation },
//         ],
//         price: "297.00$",
//     },
//     {
//         image: 'golf_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/volkswagen/golf_lrg.jpg',
//         title: "Volkswagen",
//         model: "Golf",
//         typeCar: "Hatchback",
//         discount: "12% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "8 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Manual", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "133.00$",
//     },
//     {
//         image: 'c-hr_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/toyota/c-hr_lrg.jpg',
//         title: "Toyota",
//         model: "C-HR",
//         typeCar: "SUV",
//         discount: "12% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "4 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Hybrid", icon: GasStation },
//         ],
//         price: "153.00$",
//     },
//     {
//         image: '508_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/peugeot/508_lrg.jpg',
//         title: "Peugeot",
//         model: "508",
//         typeCar: "Sedan",
//         discount: "12% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "9 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "203.00$",
//     },
//     {
//         image: 'ds7_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/new_images/citroen/ds7_lrg.jpg',
//         title: "Citroen",
//         model: "DS7",
//         typeCar: "SUV",
//         discount: "14% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "5 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Hybrid", icon: GasStation },
//         ],
//         price: "277.00$",
//     },
//     {
//         image: '5008_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/peugeot/5008_lrg.jpg',
//         title: "Peugeot",
//         model: "5008",
//         typeCar: "MPV",
//         discount: "16% off",
//         features: [
//             { passengers: 7, icon: Users },
//             { consumption: "8 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Manual", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "194.00$",
//     },
//     {
//         image: 'taurus_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/ford/taurus_lrg.jpg',
//         title: "Ford",
//         model: "Taurus",
//         typeCar: "Sedan",
//         discount: "13% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "11 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "154.00$",
//     },
//     {
//         image: 'octavia_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/skoda/octavia_lrg.jpg',
//         title: "Skoda",
//         model: "Octavia",
//         typeCar: "Sedan",
//         discount: "13% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "8 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Manual", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "134.00$",
//     },
//     {
//         image: 'captur_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/renault/captur_lrg.jpg',
//         title: "Renault",
//         model: "Captur",
//         typeCar: "Hatchback",
//         discount: "11% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "7 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Manual", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "154.00$",
//     },
//     {
//         image: 'q5_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/audi/q5_lrg.jpg',
//         title: "Audi",
//         model: "Q5",
//         typeCar: "SUV",
//         discount: "16% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "13 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Diesel", icon: GasStation },
//         ],
//         price: "194.00$",
//     },
//     {
//         image: 'transporter_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/volkswagen/transporter_lrg.jpg',
//         title: "Volkswagen",
//         model: "Transporter",
//         typeCar: "MPV",
//         discount: "16% off",
//         features: [
//             { passengers: 9, icon: Users },
//             { consumption: "12 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Diesel", icon: GasStation },
//         ],
//         price: "304.00$",
//     },
//     {
//         image: 'v_class_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/mercedes/v_class_lrg.jpg',
//         title: "Mercedes-Benz",
//         model: "V-Class",
//         typeCar: "MPV",
//         discount: "17% off",
//         features: [
//             { passengers: 7, icon: Users },
//             { consumption: "11 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Diesel", icon: GasStation },
//         ],
//         price: "324.00$",
//     },
//     {
//         image: 'passat_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/volkswagen/passat_lrg.jpg',
//         title: "Volkswagen",
//         model: "Passat",
//         typeCar: "Sedan",
//         discount: "19% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "9 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "224.00$",
//     },
//     {
//         image: 'tt_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/audi/tt_lrg.jpg',
//         title: "Audi",
//         model: "TT",
//         typeCar: "Coupe",
//         discount: "19% off",
//         features: [
//             { passengers: 4, icon: Users },
//             { consumption: "10 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "194.00$",
//     },
//     {
//         image: '4_series_convertible_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/bmw/4_series_convertible_lrg.jpg',
//         title: "BMW",
//         model: "4 series",
//         typeCar: "Coupe",
//         discount: "20% off",
//         features: [
//             { passengers: 4, icon: Users },
//             { consumption: "12 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Diesel", icon: GasStation },
//         ],
//         price: "234.00$",
//     },
//     {
//         image: 'ranger_4_doors_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/web/ford/ranger_4_doors_lrg.jpg',
//         title: "Ford",
//         model: "Ranger",
//         typeCar: "SUV",
//         discount: "20% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "13 LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Petrol", icon: GasStation },
//         ],
//         price: "264.00$",
//     },
//     {
//         image: 'i3_lrg',
//         img: 'https://res.cloudinary.com/strive-tetiana-yaremko/image/upload/v1654355443/cars/i3_lrg_l0eiwx.jpg',
//         title: "BMW",
//         model: "i3",
//         typeCar: "Hatchback",
//         discount: "20% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "N/A LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Electic", icon: GasStation },
//         ],
//         price: "174.00$",
//     },
//     {
//         image: 'zoe_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/new_images/renault/zoe_lrg.jpg',
//         title: "Renault",
//         model: "Zoe",
//         typeCar: "Hatchback",
//         discount: "10% off",
//         features: [
//             { passengers: 4, icon: Users },
//             { consumption: "N/A LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Electic", icon: GasStation },
//         ],
//         price: "134.00$",
//     },
//     {
//         image: 'tesla_s_lrg',
//         img: 'https://cdn2.rcstatic.com/images/car_images/new_images/tesla/model_s_lrg.jpg',
//         title: "Tesla",
//         model: "Model S",
//         typeCar: "Sedan",
//         discount: "20% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "N/A LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Electic", icon: GasStation },
//         ],
//         price: "204.00$",
//     },
//     {
//         image: 'tesla_x_lrg',
//         img: 'https://res.cloudinary.com/strive-tetiana-yaremko/image/upload/v1654355444/cars/tesla_x_lrg_gfwbem.jpg',
//         title: "Tesla",
//         model: "Model X",
//         typeCar: "SUV",
//         discount: "23% off",
//         features: [
//             { passengers: 5, icon: Users },
//             { consumption: "N/A LITERS/100 KM", icon: Gauge },
//             { gearbox: "Automatic", icon: ManualGearbox },
//             { fuelType: "Electic", icon: GasStation },
//         ],
//         price: "254.00$",
//     },
// ];


const HomePage = (props) => {
    const [scroll, scrollTo] = useWindowScroll();
    const { classes, cx } = useStyles();
    const matches = useMediaQuery("(min-width: 769px)");
    const [opened, setOpened] = useState(false);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const [filters, setFilters] = useState({
        titles: [],
        types: [],
        gear: [],
        fuelType: [],
        passengers: [],
    });
    const [activePage, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loader, setLoader] = useState(true);



    const loaderFunc = () => {
        return (
            <LoadingOverlay
                visible={loader}
                loaderProps={{ size: 'xl', variant: 'bars' }}
                overlayOpacity={0.5}
            />
        );
    }

    const getCars = async () => {
        try {
            let url = `https://cars-rent-api.herokuapp.com/cars/?limit=9&offset=${activePage - 1}&`;
            Object.keys(filters).forEach((keys) => {
                if (
                    filters[keys] &&
                    Array.isArray(filters[keys]) &&
                    filters[keys].length > 0
                ) {
                    url += `${keys}=${filters[keys].join(",")}&`;
                } else if (filters[keys] && !Array.isArray(filters[keys])) {
                    url += `${keys}=${filters[keys]}&`;
                }

            });

            if (search.length > 0) {
                url += `search=${search}`;
            }


            const resp = await axios.get(url);
            setData(resp.data.data);
            setTotalPages(resp.data.total);

        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {
            setLoader(false);
        }, 1500);
    };



    useEffect(() => {
        getCars();
    }, [filters, search, activePage]);

    useEffect(() => {
        getCars();
    }, []);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <>
            {loader && (loaderFunc())}
            <Container size={1500}>
                <HeaderHero />
                <main className="main">
                    <Grid gutter={"xl"}>
                        <Grid.Col span={2} className={classes.filtersContainer}>
                            {!matches ? (
                                <Drawer
                                    opened={opened}
                                    onClose={() => setOpened(false)}
                                    size={"lg"}
                                >
                                    <Group
                                        px="lg"
                                        styles={{ root: { overflowY: "scroll", height: "90%" } }}
                                    >
                                        <Filter filters={filters} setFilters={setFilters} capitalizeFirstLetter={capitalizeFirstLetter} />
                                    </Group>
                                </Drawer>
                            ) : (
                                <Filter
                                    opened={opened}
                                    setOpened={setOpened}
                                    filters={filters}
                                    setFilters={setFilters}
                                    capitalizeFirstLetter={capitalizeFirstLetter}
                                    loader={loader}
                                    setLoader={setLoader}
                                    loaderFunc={loaderFunc}
                                />
                            )}
                        </Grid.Col>
                        <Grid.Col span={matches ? 10 : 12}>
                            <Grid>
                                <Grid.Col span={8} style={{ alignSelf: 'end', padding: 4, }}>
                                    {!matches && (
                                        <ActionIcon size="xl" onClick={() => setOpened(true)}>
                                            <FilterIcon
                                                size={38}
                                                strokeWidth={2}
                                                color={'#417E27'}
                                            />
                                        </ActionIcon>
                                    )}
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <TextInput
                                        placeholder="Search your favorite car"
                                        label="Search cars"
                                        radius="md"
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </Grid.Col>
                                {data.length > 0 ?
                                    (data.map((product, index) => (
                                        <Grid.Col xs={6} lg={4}>
                                            <ProductCard key={index + 1} product={product} capitalizeFirstLetter={capitalizeFirstLetter} />
                                        </Grid.Col>))) :
                                    (
                                        <Text size="xl" weight={700} style={{
                                            textAlign: 'center',
                                            margin: '0 auto',
                                            marginTop: '50px'
                                        }}>Sorry, but car not found.<br />Please, try again</Text>)}
                            </Grid>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Pagination page={activePage} onChange={setPage} total={totalPages} style={{ justifyContent: 'center' }} onClick={() => scrollTo({ y: 520 })} />
                        </Grid.Col>
                    </Grid>


                </main>
                <ContactUs p={0} />
            </Container >
        </>
    );
}

export default HomePage;