// .then = une fois que c'est là, tu fais une action.
// Promise = constructeur déjà existant en JS, pour pouvoir faire des choses qui s'enchainent sans contrainte de temps.
// Permet de gérer l'asynchrone en gardant le code le plus lisible possible. >< Pyarmid of doom
// Prend une callback qui a un argument, traditionnellement resolve.
// ajax => fonction qui retourne une promesse
/*
const p = new Promise((resolve) => {
  setTimeout(() => {
    console.log("coucou");
    resolve();
  }, 2000);
});

p.then(() =>
  setTimeout(() => {
    console.log("coucou toi-même");
  }, 1000)
);

const timeout = (msg, time) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, time)
  );
timeout("coucou", 4000)
  .then(() => timeout("Tu", 1000))
  .then(() => timeout("Vas", 1000))
  .then(() => timeout("Bien ?", 1000));
*/
// FETCH : seulement côté client, pas en node js
// S'utilise d'office avec une réponse transformée en json
console.log("toto");

// RANDOM USER
let userName, lastName, photo, country, script, genderLikely, fullCountryname;

const getRandomUser = () => {
  return fetch("https://randomuser.me/api/").then((response) =>
    response.json()
  );
};

// API KEY GENEALOGY

const options = {
  headers: {
    "X-API-KEY": "e6431dc15981660d041349cc5ccbadfd",
  },
};

const getGenealogy = (firstName, lastName) => {
  return fetch(
    `https:///v2.namsor.com/NamSorAPIv2/api2/json/origin/${firstName}/${lastName}`,
    options
  ).then((res) => res.json());
};

// GENDER

const getGenderName = (firstName, lastName) => {
  return fetch(
    `https:///v2.namsor.com/NamSorAPIv2/api2/json/gender/${firstName}/${lastName}`,
    options
  ).then((res) => res.json());
};

// COUNTRY FULL NAME

const getFullCountry = (countryCode) => {
  return fetch(
    `https://restcountries.eu/rest/v2/alpha/${countryCode}`
  ).then((res) => res.json());
};

// INSERT IN HTML

const divPerson = document.getElementById("person");
const btn = document.getElementById("btn-random");
btn.addEventListener("click", () => {
  getRandomUser().then((data) => {
    userName = data.results[0].name.first;
    lastName = data.results[0].name.last;
    photo = data.results[0].picture.large;
    getGenealogy(userName, lastName).then((data) => {
      country = data.countryOrigin;
      getFullCountry(country).then((data) => {
        fullCountryname = data.name;
      });
      topRegion = data.topRegionOrigin;
      script = data.script;
      getGenderName(userName, lastName).then((data) => {
        genderLikely = data.likelyGender;
        divPerson.innerHTML += `
        <h1> ${userName} ${lastName} </h1>
        <img src="${photo}" alt="${userName}" />
        <ul> 
            <li> Pays d'origine le plus fréquent : ${fullCountryname} </li>
            <li> Région la plus fréquente : ${topRegion} </li>
            <li> Origine du prénom : ${script} </li>
            <li> Genre le plus fréquent : ${
              genderLikely === "female" ? "femme" : "homme"
            } </li>
        </ul>
    `;
      });
    });
  });
});
