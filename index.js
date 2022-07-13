const API_URL = "https://restcountries.com/v3.1/lang/eng";
const searcher = document.getElementById("searcher");

const getCountries = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    const country = data.map((item) => {
        const name = item.name.common;
        const flag = item.flags.png;
        const continent = item.region;
        const people = numberWithCommas(item.population);
        const capital = item.capital;
        return { name, flag, continent, people, capital };
    });
    countrySectionContainer.innerHTML = "";
    createCountry(country, countrySectionContainer);
};

const createCountry = (country, container) => {
    country.forEach(({ flag, name, continent, people, capital }) => {
        const countryContainer = document.createElement("div");
        const img = document.createElement("img");
        img.classList.add("country-img");
        img.src = flag;

        img.addEventListener("click", () => {
            location.hash = "country=" + name;
            countryDetails();
        });

        const detailContainer = document.createElement("div");
        detailContainer.classList.add("country-details");
        const countryName = document.createElement("h2");
        countryName.classList.add("country-name");
        countryName.textContent = name;

        const populationContainer = document.createElement("p");
        populationContainer.textContent = "Population: ";
        const populationNumber = document.createElement("span");
        populationNumber.textContent = people;
        populationContainer.appendChild(populationNumber);

        const regionContainer = document.createElement("p");
        regionContainer.textContent = "Region: ";
        const regionName = document.createElement("span");
        regionName.textContent = continent;
        regionContainer.appendChild(regionName);

        const capitalContainer = document.createElement("p");
        capitalContainer.textContent = "Capital: ";
        const capitalName = document.createElement("span");
        capitalName.textContent = capital;
        capitalContainer.appendChild(capitalName);

        capitalContainer.classList.add("country-detail");
        regionContainer.classList.add("country-detail");
        populationContainer.classList.add("country-detail");

        detailContainer.appendChild(countryName);
        detailContainer.appendChild(populationContainer);
        detailContainer.appendChild(regionContainer);
        detailContainer.appendChild(capitalContainer);

        countryContainer.classList.add("country");
        countryContainer.appendChild(img);
        countryContainer.appendChild(detailContainer);
        container.appendChild(countryContainer);
    });
};
const createCountryDetails = (country) => {
    const flag = country.flags.png;
    const countryName = country.name.common;
    const native = country.name.official;
    const subreg = country.subregion;
    const capital = country.capital[0];
    const web = country.tld[0];
    const currency = Object.values(country.currencies);
    const currencies = currency.map((item) => item.name).toString();
    console.log(currencies);

    const lang = Object.values(country.languages);
    const language = lang.toString();
    console.log(language);

    return (countryInfo.innerHTML = `<img
    class="flag"
    src="${flag}"
    alt=""
/>
<article class="country-details">
    <div class="main-details">
        <h2 class="country-name">${countryName}</h2>
        <p class="country-detail">
            Native name:
            <span>${native}</span>
        </p>
        <p class="country-detail">
            Population:
            <span>${numberWithCommas(country.population)}</span>
        </p>
        <p class="country-detail">
            Region:
            <span>${country.region}</span>
        </p>
        <p class="country-detail">
            Sub Region:
            <span>${subreg}</span>
        </p>
        <p class="country-detail">
            Capital:
            <span>${capital}</span>
        </p>
    </div>
    <div class="more-details">
        <p class="country-detail">
            Top Level Domain:
            <span>${web}</span>
        </p>
        <p class="country-detail">
            Currencies:
            <span>${currencies}</span>
        </p>
        <p class="country-detail">
            Languages:
            <span>${language}</span>
        </p>
    </div>
    <div class="near-countries">
        <p class="country-detail">Border Countries:</p>
        <div class="border-countries">
        </div>
    </div>
</article>`);
};
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
}

function getCountryByRegion() {}

async function getCountryBySearch(keyword) {
    const URL = `https://restcountries.com/v3.1/name/${keyword}`;
    getCountries(URL);
}

searcher.addEventListener("keyup", () => {
    const searchervalue = searcher.value;
    if (searchervalue.length >= 3) {
        countrySectionContainer.innerHTML = "";
        getCountryBySearch(searchervalue);
    } else {
        homePage();
    }
});
