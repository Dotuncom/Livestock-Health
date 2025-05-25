import { useNavigate } from "react-router-dom";

//src/components/SummaryInfo.jsx
export default function SummaryInfo() {
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate('/animal-profile')
  }
    return (
      <div className="flex gap-10 mb-6 text-gray-700 " onClick={handleClick}>
        <p><strong>Total N.o</strong> 100</p>
        <p><strong>Animals with abnormal vitals</strong> 10</p>
        <p><strong>Breeds</strong> 2</p>
      </div>
    );
  }
  