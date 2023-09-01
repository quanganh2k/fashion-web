import { useCallback, useEffect, useState } from "react";
import productServices from "../../services/productServices";

const useGetProducts = (filters) => {
  //! State
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  console.log("datat",data)

  const parseResponse = useCallback(
    (response) => {
      //* If page === 1 -> setData(response.data);
      //* If page > 1 -> setData(prev => [...prev, ...response.data])

      const products = response?.data?.results?.data;
      const totalPage = response?.data?.results?.pageCount;

      if (filters.page === 1) {
        setData(products);
        setIsLoading(false);
      } else {
        setData((prevData) => [...prevData, ...products]);
        setIsLoadingMore(false);
      }

      if (filters.page < totalPage) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    },
    [filters.page]
  );

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
      setData((prev) => [...prev, ...products]);
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
      if (filters.page === 1) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }

        const response = await productServices.getProducts(filters);
        parseResponse(response);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        setHasMore(false);
        setIsLoadingMore(false);
      }
    };

    fetchData();
  }, [filters, parseResponse]);

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
