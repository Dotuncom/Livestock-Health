export default function AlertToolbar() {
  return (
    <div className="flex flex-wrap gap-3 justify-between items-center bg-white p-4 rounded-md shadow-sm">
      <input
        type="text"
        placeholder="Search by animal ID or farm..."
        className="border border-gray-300 px-3 py-2 rounded-md w-full md:w-[300px] font-inter text-sm"
      />

      <div className="flex gap-3">
        <select className="px-3 py-2 border rounded-md text-sm text-gray-700">
          <option value="">All Types</option>
          <option value="injury">Injury</option>
          <option value="illness">Illness</option>
        </select>

        <select className="px-3 py-2 border rounded-md text-sm text-gray-700">
          <option value="">Sort by Time</option>
          <option value="recent">Most Recent</option>
        </select>
      </div>
    </div>
  );
}
