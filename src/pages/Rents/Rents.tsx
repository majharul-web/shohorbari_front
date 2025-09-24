import RentList from "@/components/rents/RentList";
import RentModal from "@/components/rents/RentModal";
import { useDebounced } from "@/hooks/useDebounced";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const Rents = () => {
  const location = useLocation();

  // Parse query params from URL
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("q") || "";
  const initialCategory = params.get("category") || "";

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);

  const { data } = useGetAllCategoriesQuery({}, { refetchOnMountOrArgChange: true });
  const cats = data?.results || [];

  const query: Record<string, any> = {};

  const debouncedTerm = useDebounced({
    searchQuery: search,
    delay: 600,
  });

  if (debouncedTerm) {
    query["title"] = debouncedTerm;
  }

  if (category) query.category = category;

  const categories = useMemo(
    () => cats.map((cat: Record<string, any>) => ({ label: cat.name, value: cat.id.toString() })),
    [cats]
  );

  // Keep URL in sync when search/category changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (category) params.set("category", category);

    const queryString = params.toString();
    const newUrl = queryString ? `/rents?${queryString}` : "/rents";

    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.replaceState(null, "", newUrl);
    }
  }, [search, category]);

  return (
    <div className='py-6'>
      <div className='flex justify-between flex-col md:flex-row'>
        {/* Filters */}
        <div className='flex flex-col md:flex-row gap-3 w-full pb-6'>
          <input
            type='text'
            aria-label='Search rentals'
            placeholder='Search title...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full md:w-1/4 rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
          />
          <select
            aria-label='Filter by category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full md:w-1/3 rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition'
          >
            <option value=''>All Categories</option>
            {categories.map((cat: Record<string, any>) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div className='flex justify-end pb-6'>
          <RentModal mode='add' />
        </div>
      </div>

      {/* Rent List */}
      <RentList title='Available Rentals' query={query} />
    </div>
  );
};

export default Rents;
