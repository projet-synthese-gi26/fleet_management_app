import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat') || '4.0511'; // Default to Douala
    const lon = searchParams.get('lon') || '9.7679'; // Default to Douala

    const apiKey = process.env.KEY_WEATHER_API;

    if (!apiKey) {
        return NextResponse.json({ error: 'Weather API key is not configured.' }, { status: 500 });
    }

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(weatherApiUrl);
        if (!res.ok) {
            const errorData = await res.json();
            return NextResponse.json({ error: `Failed to fetch weather data: ${errorData.message}` }, { status: res.status });
        }
        const data = await res.json();

        // Extract relevant data
        const weatherData = {
            temp: data.main.temp,
            condition: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            location: data.name,
        };

        return NextResponse.json(weatherData);

    } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: `Internal Server Error: ${errorMessage}` }, { status: 500 });
    }
}
