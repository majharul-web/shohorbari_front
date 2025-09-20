import RentList from "@/components/rents/RentList";
import { Button } from "@/components/ui/button";
import { Radar } from "lucide-react";
import { useState } from "react";

const categories = [
  { value: "", label: "All Categories" },
  { value: 1, label: "Apartment" },
  { value: 2, label: "House" },
  { value: 3, label: "Plot" },
];

const rentOptions = [
  { value: "", label: "All Rent Options" },
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
  { value: "daily", label: "Daily" },
];

const Rents = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | number>("");
  const [rentOption, setRentOption] = useState<string>("");

  const handleSearch = () => {
    console.log({ search, category, rentOption });
    // Pass these filters to RentList if needed
  };

  return (
    <div className='py-6'>
      <div className=''>
        <div className='flex justify-end pb-6'>
          <Button
            type='submit'
            variant='default'
            className='py-3 font-bold'
            // disabled={isLoading}
          >
            Add Rents
          </Button>
        </div>
        {/* Filters */}
        <div className='flex flex-col md:flex-row gap-3 w-full pb-6'>
          <select
            value={category ?? ""}
            onChange={(e) => setCategory(Number(e.target.value))}
            className='block w-full rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
          >
            <option value=''>All Categories</option>
            <option value='1'>Apartment</option>
            <option value='2'>House</option>
            <option value='3'>Plot</option>
          </select>

          <input
            type='text'
            placeholder='Search city, neighborhood...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='block w-full rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
          />

          <button
            onClick={handleSearch}
            className='flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/80 transition w-full md:w-auto'
          >
            <Radar size={18} />
            Search
          </button>
        </div>
      </div>

      {/* Rent List */}
      <RentList
        title='Available Rentals'

        // filters={{ search, category, rentOption }} // pass filters to your component
      />
    </div>
  );
};

export default Rents;
