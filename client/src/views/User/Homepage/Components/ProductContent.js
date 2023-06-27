import React, { memo, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useGet } from "../../../../store/useCached";
import { queryKeys } from "../../../../constants/queryKeys";
import useFiltersHandler from "../../../../hooks/useFiltersHandler";
import useGetProducts from "../../../../hooks/product/useGetProducts";
import Products from "./Products";
import ScrollWrapper from "../../../../components/ScrollWrapper";

const ProductContent = () => {
  //! State
  const [searchParams] = useSearchParams();
  const tabOnUrl = searchParams.get("tab");
  const dataClassify = useGet(queryKeys.classify);
  const initialFilters = useMemo(
    () => ({
      page: 1,
      limit: 12,
      classify:
        (dataClassify || [])?.find((el) => el.name === tabOnUrl)?._id || "",
      search: "",
    }),
    [dataClassify, tabOnUrl]
  );
  const { filters, increasePage } = useFiltersHandler(initialFilters);
  const { data, hasMore, isLoading, isLoadingMore } = useGetProducts(filters);

  //! Function
  const handleOnScrollEnd = () => {
    if (hasMore & !isLoading) {
      increasePage();
    }
  };

  //! Render
  return (
    <ScrollWrapper onScrollEnd={handleOnScrollEnd}>
      <Products
        data={data}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
      />
    </ScrollWrapper>
  );
};

export default memo(ProductContent);
