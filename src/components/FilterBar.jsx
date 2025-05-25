//src/components/FilterBar.jsx
export default function FilterBar() {
    const filters = ["All", "Female", "Male", "Affected"];
  
    return (
      <div className="flex gap-4 mb-4">
        {filters.map((filter) => (
          <button
            key={filter}
            className="bg-white md:w-[131px] md:h-[41px] text-[18px] rounded-[10px] border hover:bg-gray-100"
          >
            {filter}
          </button>
        ))}
      </div>
    );
  }
  
  