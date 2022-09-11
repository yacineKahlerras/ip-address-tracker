/**
 * =====================
 * =====================
 *        ip adress
 * =====================
 * =====================
 * */
const apiUrl =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_d7WLCbpcwqu5L6ntRswFt4lx0HjMS&ipAddress=";
let mapInitiated = false,
  isFlying = false;
let map, marker, myIcon;

/** extracting data */
const init = async (ip) => {
  const data = await fetchData(ip);
  getMap(data.location.lat, data.location.lng);
};

/** fetch data */
const fetchData = async (ip) => {
  if (!ip) ip = "";
  let response = await fetch(`${apiUrl}${ip}`, {
    cache: "no-cache",
  }).catch(() => {
    console.log("error");
  });
  if (response) return response.json();
  return response;
};

/** initializes everything */
init("");

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
    map = L.map("map").setView([lat, lng], 13);
    layer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // when moving to another location
    map.addEventListener("moveend", () => {
      if (isFlying) {
        console.log("nigga we here !!");
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
  } else {
    // flies to a another location
    isFlying = true;
    map.flyTo([lat, lng], 10, {
      animate: true,
      duration: 2,
    });
    marker.setLatLng([lat, lng]);
  }
};

/**
 * =====================
 * =====================
 *         input
 * =====================
 * =====================
 * */
const inputField = document.querySelector("input[type=text]");
const submitButton = document.querySelector("input[type=submit]");

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    init(inputField.value);
  }
});
submitButton.addEventListener("click", (e) => {
  init(inputField.value);
});
