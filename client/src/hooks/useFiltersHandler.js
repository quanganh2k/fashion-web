import { cloneDeep } from "lodash";
import { useState, useCallback, useEffect } from "react";
import { useGet, useSave } from "../store/useCached";

const useFiltersHandler = (initialFilters, { filterKey = "" } = {}) => {
  //! State
  const [filters, setFilters] = useState(initialFilters);
  const [tabActive, setTabActive] = useState("All");
  const save = useSave();

  useEffect(() => {
    if (filterKey) {
      save(filterKey, setFilters);
    }
  }, [save, filterKey]);

  //! Function
  const increasePage = useCallback(() => {
    setFilters((prev) => {
      const nextFilters = cloneDeep(prev);
      if (nextFilters) {
        nextFilters["page"] = (nextFilters["page"] || 0) + 1;
      }
      return nextFilters;
    });
  }, []);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  //! Render
  return {
    filters,
    setFilters,
    increasePage,
    tabActive,
    setTabActive,
  };
};

export default useFiltersHandler;
