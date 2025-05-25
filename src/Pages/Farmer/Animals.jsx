import React from "react";
import FilterBar from "../../components/FilterBar";
import SummaryInfo from "../../components/SummaryInfo";
import AnimalCard from "../../components/AnimalCard";
import ViewMoreButton from "../ViewMoreButton";

const Animals = () => {
  const data = [
    { id: "001", breed: "Sokoto Gudali", status: "Healthy", date: "12/3/25" },
    { id: "002", breed: "Red Bororo", status: "Sick", date: "12/3/25" },
    { id: "003", breed: "Red Bororo", status: "Sick", date: "12/3/25" },
    { id: "004", breed: "Sokoto Gudali", status: "Healthy", date: "12/3/25" },
    { id: "005", breed: "White Fulani", status: "Healthy", date: "12/3/25" },
    { id: "006", breed: "Yankasa", status: "Healthy", date: "12/5/25", species: "Goat" },
    { id: "007", breed: "Sokoto Gudali", status: "Healthy", date: "12/3/25" },
    { id: "008", breed: "Sokoto Gudali", status: "Sick", date: "12/5/25" },
    { id: "009", breed: "White Fulani", status: "Healthy", date: "12/3/25" },
  ];

  return (
    <div className="h-full bg-white/60 shadow-[0px_4px_17px_11px_rgba(0,0,0,0.03)] p-4 sm:p-6 md:p-[100px] drop-shadow-sm">
      <FilterBar />
      
      <div>
        <SummaryInfo/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-[30px] mt-6">
        {data.map((animal) => (
          <AnimalCard key={animal.id} {...animal} />
        ))}
      </div>

      <ViewMoreButton  />
    </div>
  );
};

export default Animals;
