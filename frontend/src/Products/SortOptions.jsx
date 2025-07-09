import { useSearchParams } from "react-router-dom"

function SortOptions() {
  const [searchParams, setSearchParams]=useSearchParams();
  const handleSortChange=(e)=>{
    const sortBy = e.target.value;
    searchParams.set("sortBy",sortBy);
    setSearchParams(searchParams);
  }
  return (
    <div className="mb-4 flex items-center justify-end">
      <select id="sort" 
      onChange={handleSortChange}
      value={searchParams.get("sortBy") || ""}
      className="border p-2 rounded-md focus:outline-none">
        <option value="">default</option>
        <option value="priceAsc">Price:low to hight</option>
        <option value="priceDesc">Price:hight to low</option>
        <option value="popularity">popularity</option>
      </select>
    </div>
  )
}

export default SortOptions;