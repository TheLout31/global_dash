const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search countries..."
        className="border px-4 py-2 w-full max-w-md rounded-lg shadow-sm"
      />
    </div>
  );
};

export default SearchBar;
