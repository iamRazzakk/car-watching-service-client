import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CInput from "../../components/Form/CInput";
import {
  resetFilters,
  setFilter,
  setSearchQuery,
} from "../../redux/features/auth/serviceSlice";
import Button from "../../shared/Button/Button";
import SortComponent from "./SortComponent";
import ILabel from "../../components/Form/ILabel";

const FilterSearchComponent: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.services.searchQuery
  );
  const filters = useSelector((state: RootState) => state.services.filters);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const minPrice = Number(e.target.value) || 0;
    dispatch(setFilter({ ...filters, minPrice }));
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maxPrice = Number(e.target.value) || 0;
    dispatch(setFilter({ ...filters, maxPrice }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="filter-search-container">
      <div className="lg:w-1/3 mx-auto ">
        <CInput
          type="text"
          name="search"
          placeholder="Search services"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="lg:flex items-center justify-center gap-4">
        <ILabel label="Min: " htmlFor="Min"></ILabel>
        <CInput
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={
            filters.minPrice !== undefined ? filters.minPrice.toString() : ""
          }
          onChange={handleMinPriceChange}
        />
        <ILabel  label="Max: " htmlFor="Max"></ILabel>
        <CInput
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={
            filters.maxPrice !== undefined ? filters.maxPrice.toString() : ""
          }
          onChange={handleMaxPriceChange}
        />
        <SortComponent />
        <Button
          onClick={handleReset}
          className="reset-button"
          text="Reset"
          category="primary"
        />
      </div>
    </div>
  );
};

export default FilterSearchComponent;
