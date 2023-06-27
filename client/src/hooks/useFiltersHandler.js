import { cloneDeep } from "lodash";
import React, { useState, useCallback, useEffect } from "react";

const useFiltersHandler = (initialFilters) => {
  //! State
  const [filters, setFilters] = useState(initialFilters);
  const [tabActive, setTabActive] = useState("All");

  console.log("renderFilters", initialFilters, filters, tabActive);

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

  const changeTab = useCallback((tab, listTabs) => {
    console.log("__changeTab", tab);
    setTabActive(tab);
    setFilters((prev) => {
      const nextFilters = cloneDeep(prev);
      const classifySelected = listTabs.find((el) => el.name === tab);
      nextFilters["page"] = 1;
      if (tab === "All") {
        nextFilters["classify"] = "";
      } else {
        nextFilters["classify"] = classifySelected._id;
      }
      return nextFilters;
    });
  }, []);

  // useEffect(() => {
  //   setTabActive(tab)
  // },[])

  //! Render
  return {
    filters,
    setFilters,
    increasePage,
    changeTab,
    tabActive,
    setTabActive,
  };
};

export default useFiltersHandler;
