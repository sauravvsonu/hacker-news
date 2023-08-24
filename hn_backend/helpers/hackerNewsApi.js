// hackerNewsAPI.js
const axios = require('axios');
const { setupCache } = require('axios-cache-adapter');

const cache = setupCache({
  maxAge: 15 * 60 * 1000, // Cache responses for 15 minutes
});

const axiosInstance = axios.create({
  adapter: cache.adapter,
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
});

const baseURL = 'https://hacker-news.firebaseio.com/v0/';

const fetchItem = async (itemId) => {
  try {
    const response = await axiosInstance.get(`${baseURL}item/${itemId}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
}

const fetchUser = async (userId) => {
    try {
        const response = await axiosInstance.get(`${baseURL}user/${userId}.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

const fetchMaxitem = async () => {
    try {
        const response = await axiosInstance.get(`${baseURL}maxitem.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching maxitem:', error);
        throw error;
    }
}

const fetchTopStories = async () => {
    try {
        const response = await axiosInstance.get(`${baseURL}topstories.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching topstories:', error);
        throw error;
    }
}

const fetchNewStories = async () => {
    try {
        const response = await axiosInstance.get(`${baseURL}newstories.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching newstories:', error);
        throw error;
    }
}

const fetchBestStories = async () => {
    try {
        const response = await axiosInstance.get(`${baseURL}beststories.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching beststories:', error);
        throw error;
    }
}

const fetchAskStories = async () => {
    try {
        const response = await axiosInstance.get(`${baseURL}askstories.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching askstories:', error);
        throw error;
    }
}

const fetchShowStories = async () => {
    try {
        const response = await axiosInstance.get(`${baseURL}showstories.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching showstories:', error);
        throw error;
    }
}

const fetchJobStories = async () => {
    try {
        const response = await axiosInstance.get(`${baseURL}jobstories.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching jobstories:', error);
        throw error;
    }
}

const fetchUpdates = async () => {
    try {
        const response = await axiosInstance.get(`${baseURL}updates.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching updates:', error);
        throw error;
    }
}




module.exports = {
    fetchItem,
    fetchUser,
    fetchMaxitem,
    fetchTopStories,
    fetchNewStories,
    fetchBestStories,
    fetchAskStories,
    fetchShowStories,
    fetchJobStories,
    fetchUpdates
};