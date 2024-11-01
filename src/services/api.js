import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchLiveVideo = () => API.get("/videos/live");
export const fetchNextVideo = (date) => API.get(`/videos/next/${date}`);
export const fetchBeforeVideo = (date) => API.get(`/videos/before/${date}`);
export const fetchRecentVideo = () => API.get("/videos/recent");
export const fetchVideosByDate = (date) => API.get(`/videos/calendar?date=${date}`);
export const updateViewersCount = (data) => API.post("/viewers", data);
