import FarmerRequestCard from "../components/FarmerRequestCard";

export default function AlertSection({ title, alerts }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      {alerts.length === 0 ?(
        <p className="text-sm text-gray-400">No alerts in this category.</p>
      ) : (
        alerts.map((alert, index) => (
          <FarmerRequestCard key={index} farmer={alert} />
        ))
      )}
    </div>
  );
}
