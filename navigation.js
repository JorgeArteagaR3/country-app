window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
const countrySectionContainer = document.getElementById("countryContainer");
const countryInfo = document.getElementById("countryInfo");
const searchSection = document.querySelector(".search-section");
const goBackBtnContainer = document.querySelector(".button-container");
const goBackBtn = document.querySelector(".go-back-btn");
const regionFilter = document.getElementById("region");
goBackBtn.addEventListener("click", () => {
    history.back();
});
regionFilter.addEventListener("change", (e) => {
    console.log(e.target.value);
    if (e.target.value == 1) {
        getCountries("https://restcountries.com/v3.1/region/africa");
    } else if (e.target.value == 2) {
        getCountries("https://restcountries.com/v3.1/region/ame");
    } else if (e.target.value == 3) {
        getCountries("https://restcountries.com/v3.1/region/asia");
    } else if (e.target.value == 4) {
        getCountries("https://restcountries.com/v3.1/region/europe");
    } else if (e.target.value == 5) {
        getCountries("https://restcountries.com/v3.1/region/oceania");
    } else {
        getCountries("https://restcountries.com/v3.1/lang/eng");
    }
});
function router() {
    if (location.hash.startsWith("#country=")) {
        goBackBtnContainer.classList.remove("inactive");

        countryDetails();
    } else {
        homePage();
        countrySectionContainer.classList.remove("inactive");
        countryInfo.classList.add("inactive");
        searchSection.classList.remove("inactive");
    }
}

const countryDetails = async () => {
    const [_, countryName] = location.hash.split("=");
    const res = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await res.json();
    countryInfo.innerHTML = "";
    countrySectionContainer.classList.add("inactive");
    countryInfo.classList.remove("inactive");
    searchSection.classList.add("inactive");

    createCountryDetails(data[0]);
    const border = data[0].borders;
    border.forEach((item) => {
        const borderContainer = document.querySelector(
            ".near-countries .border-countries"
        );
        const bordercountry = document.createElement("a");
        bordercountry.textContent = item;
        borderContainer.appendChild(bordercountry);
    });
};

function homePage() {
    getCountries(API_URL);
    goBackBtnContainer.classList.add("inactive");
}
