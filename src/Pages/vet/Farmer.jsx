import FarmerRequestCard from "../../components/FarmerRequestCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../App";
import { toast } from "react-toastify";

const dummyFarmers = [
  {
    name: "JA Cattle",
    avatar: "/images/ja.jpg",
    time: "May 8, 10:50 AM",
    selected: false,
  },
  {
    name: "Debby Farms",
    avatar: "/images/debby.jpg",
    time: "May 8, 10:50 AM",
    selected: true,
  },
  {
    name: "Sadri Livestock",
    avatar: "/images/sadri.jpg",
    time: "May 8, 10:50 AM",
    selected: false,
  },
];

export default function FarmerPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["farmer"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "farmer");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error fetching farmer (user) data: " + err.message);
    },
  });

  const handleSuccess = () => {
    toast.success("Farmer (user) data updated successfully!");
  };

  return (
    <div>
      <h3 className="font-bold text-4xl"> Assigned Farmers</h3>
      <div className="w-full px-4 py-6 flex justify-center">
        <div className="w-full max-w-[1000px] space-y-4">
          {isLoading ? (
            <p>Loading farmer (user) data…</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            data &&
            data.map((farmer) => (
              <FarmerRequestCard key={farmer.id} farmer={farmer} />
            ))
          )}
        </div>
      </div>
      <button onClick={handleSuccess}>Simulate Update</button>
    </div>
  );
}
