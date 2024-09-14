import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSort } from "../../redux/features/auth/serviceSlice";

const SortComponent = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.services.sort);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSort(event.target.value));
  };

  return (
    <select value={sort} onChange={handleSortChange} className="border  p-3 rounded-md">
      <option value="new">Newest</option>
      <option value="old">Oldest</option>
      <option value="low-high">Price: Low to High</option>
      <option value="high-low">Price: High to Low</option>
    </select>
  );
};

export default SortComponent;
