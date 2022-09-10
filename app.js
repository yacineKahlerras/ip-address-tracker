/**
 * =====================
 * =====================
 *        ip adress
 * =====================
 * =====================
 * */
const apiUrl =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_d7WLCbpcwqu5L6ntRswFt4lx0HjMS&ipAddress=";

/** extracting data */
const init = async (ip) => {
  const data = await fetchData(ip);
  console.log(data);
  createMap(data.location.lat, data.location.lng);
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
const createMap = (lat, lng) => {
  var map = L.map("map").setView([lat, lng], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  /** marker */
  var marker = L.marker([lat, lng]).addTo(map);
};

/**
 * =====================
 * =====================
 *         input
 * =====================
 * =====================
 * */
