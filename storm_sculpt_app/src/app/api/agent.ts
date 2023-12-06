import axios, { AxiosError, AxiosResponse } from 'axios';

const weatherAPI = axios.create ({
    baseURL: 'https://weatherapi-com.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
})

const ipAPI = axios.create ({
    baseURL: "https://api64.ipify.org/", 
})





const responseBody = (response: AxiosResponse) => response.data;

const request = {
    getWeather: (url:string) => weatherAPI.get(url).then(responseBody),
    getIP: (url:string) => ipAPI.get(url).then(responseBody),
}

const LocationDetails = {
    RealTimeweatherDetails: (ip: any) => request.getWeather(`forecast.json?q=${ip}&days=3`),
    SearchAutoComplete: (texts: string) => request.getWeather(`search.json?q=${texts}`),
}

const IPDetails = {
    ipNumber: () => request.getIP('?format=json')
}

const agent = {
    LocationDetails,
    IPDetails
}

export default agent;