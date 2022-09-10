/** IP ADRESS */
const apiUrl =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_d7WLCbpcwqu5L6ntRswFt4lx0HjMS&ipAddress=";

/** extracting data */
const dataExtract = async () => {
  const data = await fetchData();
  console.log(data);
  createMap(data.location.lat, data.location.lng);
};

/** fetch data */
const fetchData = async () => {
  let response = await fetch(`${apiUrl}`, {
    cache: "no-cache",
  }).catch(() => {
    console.log("error");
  });
  if (response) return response.json();
  return response;
};

/** MAP */
const createMap = (lat, lng) => {
  var map = L.map("map").setView([lat, lng], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  var marker = L.marker([lat, lng]).addTo(map);
};

dataExtract();
