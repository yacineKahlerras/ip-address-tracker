/**
 * =====================
 * =====================
 *         input
 * =====================
 * =====================
 * */
const inputField = document.querySelector(".ip-field");
const submitButton = document.querySelector(".submit-btn");
const randomButton = document.querySelector(".random-btn");

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    init(inputField.value);
  }
});
inputField.addEventListener("input", () => {
  removeInputError();
});

submitButton.addEventListener("click", (e) => {
  init(inputField.value);
});

randomButton.addEventListener("click", () => {
  const randomIp = `${getRandomNumbah()}.${getRandomNumbah()}.${getRandomNumbah()}.${getRandomNumbah()}`;
  init(randomIp);
  removeInputError();
});

/** gets a random number from range */
function getRandomNumbah() {
  return Math.floor(Math.random() * (100 - 200) + 100);
}

/**
 * =====================
 * =====================
 *        ip adress
 * =====================
 * =====================
 * */
const apiUrl =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_OsEBD0QnF77zYnhtySsiFwmyWHhoe&ipAddress=";
let mapInitiated = false,
  isFlying = false;
let map, marker, myIcon;
const infoTexts = [...document.getElementsByTagName("h3")];

/** extracting data */
const init = async (ip) => {
  submitButton.classList.add("waiting-submit-btn");
  const data = await fetchData(ip);
  getMap(data.location.lat, data.location.lng);
  updateTextInfos(data);
};

/** fetch data */
const fetchData = async (ip) => {
  if (!ip) ip = "";
  let response = await fetch(`${apiUrl}${ip}`, {
    cache: "no-cache",
  });
  if (!response.ok) throw Error(inputError());
  if (response) return response.json();

  submitButton.classList.remove("waiting-submit-btn");
  return response;
};

/** updates the infos texts */
const updateTextInfos = (data) => {
  inputField.value = data.ip;
  infoTexts[0].textContent = data.ip;
  infoTexts[1].textContent = `${data.location.region}, ${data.location.city} ${data.location.postalCode}`;
  infoTexts[2].textContent = `UTC ${data.location.timezone}`;
  infoTexts[3].textContent = data.isp;
};

/** throws an error */
const inputError = () => {
  submitButton.classList.remove("waiting-submit-btn");
  inputField.classList.add("input-error");
  inputField.value = "";
  inputField.placeholder = "wrong format, try again";
};

/** removes input error effect */
const removeInputError = () => {
  inputField.classList.remove("input-error");
  inputField.placeholder = "Search for any IP address or domain";
};

/** initializes everything */
// init("");

/**
 * =====================
 * =====================
 *          MAP
 * =====================
 * =====================
 * */
const getMap = (lat, lng) => {
  if (!mapInitiated) {
    // creates the map
    mapInitiated = true;
    map = L.map("map", { zoomControl: false }).setView([lat, lng], 13);
    layer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // when moving to another location
    map.addEventListener("moveend", () => {
      if (isFlying) {
        submitButton.classList.remove("waiting-submit-btn");
      }
    });

    // custom icon
    myIcon = L.icon({
      iconUrl: "./images/icon-location.svg",
      iconSize: [46, 55],
      iconAnchor: [23, 55],
    });

    // marker
    marker = L.marker([lat, lng], { icon: myIcon }).addTo(map);

    submitButton.classList.remove("waiting-submit-btn");
  } else {
    // flies to a another location
    isFlying = true;
    map.flyTo([lat, lng], 13, {
      animate: true,
      duration: 2,
    });
    marker.setLatLng([lat, lng]);
  }
};
