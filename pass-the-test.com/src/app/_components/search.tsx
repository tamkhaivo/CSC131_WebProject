// components/SearchBar.tsx
export default function SearchBar() {
  return (
    <div className="flex justify-center items-center ">
      <form
        method="GET"
        action="/search" 
        className="relative flex items-center w-lvw max-w-md"
      >
        <input
          type="text"
          name="query"
          placeholder=" Search... CSC 131 Study Guides"
          className="w-full text-black px-4 py-2 rounded-full text-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-3 px-5 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
}
