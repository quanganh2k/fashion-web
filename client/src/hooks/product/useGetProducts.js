import React, { useEffect, useState } from "react";
import productServices from "../../services/productServices";

const useGetProducts = (filters) => {
  //! State
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  console.log("dataInHoooks", data);
  console.log("lolololo", filters);

  //! Function
  const refetch = async () => {
    try {
      setIsLoading(true);
      const response = await productServices.getProducts(filters);
      const products = response?.data?.results;
      const totalPage = response?.data?.results?.pageCount;
      if (filters.page < totalPage) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setData((prev) => prev.concat(products));
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      setHasMore(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (data && data.length >= 12) {
          setIsLoadingMore(true);
        }
        const response = await productServices.getProducts(filters);
        console.log("response", response);
        console.log("pro", data);
        const products = response?.data?.results?.data;
        const totalPage = response?.data?.results?.pageCount;
        if (filters.page < totalPage) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        // setData((prev) => prev.concat(products));
        setData((prev) => [...prev, ...products]);
        setIsLoading(false);
        setIsLoadingMore(false);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
        setHasMore(false);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  //! Render
  return {
    data,
    isLoading,
    hasMore,
    error,
    refetch,
    setData,
    isLoadingMore,
  };
};

export default useGetProducts;
