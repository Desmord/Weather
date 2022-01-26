const promiseGetPosition = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
})

export const getPosition = async () => {

    try {
        let { coords }: any = await promiseGetPosition();
        return {
            lon: parseFloat(coords.longitude.toFixed(3)),
            lat: parseFloat(coords.latitude.toFixed(3)),
            error: false,
        }

    } catch (err) {
        console.log(err);
        return {
            lon: 0,
            lat: 0,
            error: true,
        }
    }

}

export const getCurrentWeather = async (lat: number, lon: number) => {

    let req = await fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${lon}&lat=${lat}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "b7a6ad5a9amsh5ab7b55232fd672p1c963ajsn2ebf0dbb8cc7",
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
            "x-rapidapi-lang": "pl",
            "x-rapidapi-units": "M",
        }
    })

    let res2 = await req.json();

    if (res2.data) {
        const data = res2.data[0];
        return {
            city_name: data.city_name,
            windSpeed: parseFloat(data.wind_spd.toFixed(1)),
            temperature: data.temp,
            airQualityIndex: data.aqi,
            rain: data.precip,
            snow: data.snow,
            clouds: data.clouds,
            currentWeatherError: false,
        }
    } else {
        return {
            city_name: 0,
            windSpeed: 0,
            temperature: 0,
            airQualityIndex: 0,
            rain: 0,
            snow: 0,
            clouds: 0,
            currentWeatherError: true,
        }
    }


}


/**
 * Returns number of hours in the future in order to get 12:00 am next day.
 * @return {number} number of three hour-long fragments.
 */
const getNumberOfHoursInFuture = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    return Math.round((24 - currentHour) / 3) + 4;
}


export const getTomorrowWeather = async (lat: number, lon: number) => {

    let req = await fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lon=${lon}&lat=${lat}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "b7a6ad5a9amsh5ab7b55232fd672p1c963ajsn2ebf0dbb8cc7",
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
            "x-rapidapi-lang": "pl",
            "x-rapidapi-units": "M",
        }
    })

    let res2 = await req.json()

    if (res2.data) {
        const data = res2.data[getNumberOfHoursInFuture()];

        return {
            tomorrowWindSpeed: parseFloat(data.wind_spd.toFixed(1)),
            tomorrowTemperature: data.temp,
            tomorrowRain: data.precip,
            tomorrowSnow: data.snow,
            tomorrowClouds: data.clouds,
            tomorrowWeatherError: false
        }
    } else {
        return {
            tomorrowWindSpeed: 0,
            tomorrowTemperature: 0,
            tomorrowRain: 0,
            tomorrowSnow: 0,
            tomorrowClouds: 0,
            tomorrowWeatherError: true,
        }
    }

}
