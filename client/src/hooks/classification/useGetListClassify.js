import classificationServices from "../../services/classificationServices";
import { queryKeys } from "../../constants/queryKeys";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSave } from "../../store/useCached";
import { delay } from "../../helpers";

export const useGetListClassify = (params) => {
  const save = useSave();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    //* Cleanup effect react
    let shouldSetData = true;

    (async () => {
      try {
        setIsLoading(true);
        const response = await classificationServices.getListClassify(params);
        if (shouldSetData) {
          const listClassify = response?.data?.results.data || [];
          const classifyWomen = listClassify.find((el) => el.name === "Women");
          const otherClassify = listClassify.filter(
            (el) => el.name !== classifyWomen.name
          );
          const nextTab = [
            { _id: "", name: "All" },
            classifyWomen,
            ...otherClassify,
          ];
          setData(nextTab);
        }

        await delay(2000);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      shouldSetData = false;
    };
  }, [params]);

  //* Watch and cached data to Zustand store
  useEffect(() => {
    save(queryKeys.classify, data);
  }, [data, save]);

  return {
    data,
    isLoading,
    error,
  };
};
