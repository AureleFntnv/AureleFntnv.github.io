"use strict";

let main = document.getElementById("main");

if (localStorage['dataCountries'] == null) {
    logCountries();
    console.log("Charger depuis l'API");
} else {
    if (checkMonth()) {
        logCountries();
        console.log("reload des données du localstorage");
    } else {
        getCountriesLocal();
        console.log("Charger en local");
    }
}

async function logCountries() {
    await fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(country => {
            country = country.sort((a, b) => a.name.common.localeCompare(b.name.common));
            localStorage.setItem('dataCountries', JSON.stringify(country));
            localStorage.setItem("date", new Date());
            getCountriesLocal();
        })
}

function getCountriesLocal() {
    let table = JSON.parse(localStorage.getItem('dataCountries'));
    for (const c of table) {
        main.innerHTML += `<div> <p>${c.name.common}</p> <img src='${c.flags.svg}'>`;
    }
}

function checkMonth() {
    const date = new Date();
    const datelocal = new Date(localStorage.getItem("date"));

    console.log(datelocal)
    
    const monthDiff = date.getMonth() - datelocal.getMonth();
    const yearDiff = date.getYear() - datelocal.getYear();

    if (monthDiff + yearDiff * 12 > 2) {
        return true;
    }
    else {
        return false;
    }
}