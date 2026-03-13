import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";
export const getSkyData = async (latitude, longitude, time) => {
  try {
    const response = await axios.post(`${API_URL}/sky`, {
      latitude: latitude,
      longitude: longitude,
      time: time,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

