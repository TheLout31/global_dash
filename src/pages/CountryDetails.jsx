import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CountryDetails = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);

  const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const NEWS_KEY = import.meta.env.VITE_NEWS_API_KEY;

  // Fetch country details
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data[0]);
      })
      .catch((err) => console.error(err));
  }, [name]);

  // Fetch weather and news when country data is ready
  useEffect(() => {
    if (!country) return;

    const capital = country.capital?.[0];
    const countryCode = country.cca2?.toLowerCase();

    if (capital) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${WEATHER_KEY}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => setWeather(data))
        .catch((err) => console.error("Weather error:", err));
    }

    if (countryCode) {
      fetch(
        `https://newsapi.org/v2/top-headlines?country=${countryCode}&pageSize=3&apiKey=${NEWS_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setNews(data.articles || []))
        .catch((err) => console.error("News error:", err));
    }
  }, [country]);

  if (!country) return <p className="text-center mt-10">Loading...</p>;

  const {
    flags,
    name: countryName,
    capital,
    region,
    subregion,
    population,
    area,
    languages,
    currencies,
    borders,
    latlng,
  } = country;

  const mapSrc = latlng
    ? `https://www.google.com/maps?q=${latlng[0]},${latlng[1]}&z=5&output=embed`
    : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-500 underline">
        ← Back
      </Link>

      {/* Country Header */}
      <div className="mt-6 flex flex-col items-center text-center">
        <img
          src={flags.svg}
          alt={countryName.common}
          className="w-72 h-48 object-cover mb-4 rounded shadow"
        />
        <h2 className="text-3xl font-bold mb-2">{countryName.common}</h2>
        <p className="text-gray-600 italic mb-4">{countryName.official}</p>
      </div>

      {/* Country Info */}
      <div className="grid sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg shadow">
        <p>
          <strong>Capital:</strong> {capital?.[0] || "N/A"}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Subregion:</strong> {subregion}
        </p>
        <p>
          <strong>Population:</strong> {population.toLocaleString()}
        </p>
        <p>
          <strong>Area:</strong> {area.toLocaleString()} km²
        </p>
        <p>
          <strong>Languages:</strong>{" "}
          {languages ? Object.values(languages).join(", ") : "N/A"}
        </p>
        <p>
          <strong>Currencies:</strong>
          {currencies
            ? Object.values(currencies)
                .map((c) => `${c.name} (${c.symbol})`)
                .join(", ")
            : "N/A"}
        </p>
        {borders && borders.length > 0 && (
          <p className="col-span-2">
            <strong>Borders:</strong>{" "}
            {borders.map((border) => (
              <Link
                key={border}
                to={`/country/${border}`}
                className="text-blue-600 underline mx-1"
              >
                {border}
              </Link>
            ))}
          </p>
        )}
      </div>

      {/* Map */}
      {mapSrc && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-3">🗺 Map Location</h3>
          <iframe
            title="map"
            src={mapSrc}
            className="w-full h-72 rounded-lg border"
            loading="lazy"
          ></iframe>
        </div>
      )}

      {/* Weather */}
      {weather && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-3">
            🌦 Current Weather in {capital}
          </h3>
          <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg shadow">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="Weather icon"
              className="w-16 h-16"
            />
            <div>
              <p className="text-xl font-bold">{weather.main.temp}°C</p>
              <p>{weather.weather[0].description}</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}

      {/* News */}
      {news.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-3">📰 Latest News</h3>
          <ul className="space-y-3">
            {news.map((article, index) => (
              <li key={index} className="border p-4 rounded hover:bg-gray-50">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  {article.title}
                </a>
                {article.source?.name && (
                  <p className="text-sm text-gray-600 mt-1">
                    Source: {article.source.name}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
