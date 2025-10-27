import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <Link
      to={`/country/${country.name.common}`}
      className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2">{country.name.common}</h2>
        <p>
          <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <p>
          <strong>Population:</strong> {country.population}
        </p>
      </div>
    </Link>
  );
};

export default CountryCard;
