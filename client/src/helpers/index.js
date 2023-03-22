// import querystring from "query-string";
// import QuestionModel from "@/models/question.model";
import { flattenDeep, isEmpty, upperFirst } from "lodash";
import { dehydrate, QueryClient } from "react-query";

// export const convertToFormSelect = (
//   list: any[] | any = [],
//   fieldForLabel: string | number | undefined = undefined,
//   fieldForValue: string | number | undefined = undefined,
//   noneOption: boolean | undefined = false,
// ) => {
//   if (!fieldForLabel || !fieldForValue) {
//     return [
//       ...list.reduce((arr: any, el: any) => {
//         return [...arr, { label: el, value: el }];
//       }, []),
//     ];
//   }
//   if (typeof list === `object` && list) {
//     const listReturn = [
//       ...list.reduce((arr: any, el: any) => {
//         return [
//           ...arr,
//           {
//             ...el,
//             label: el[fieldForLabel] ?? `None`,
//             value: el[fieldForValue] ?? ``,
//           },
//         ];
//       }, []),
//     ];

//     if (noneOption) {
//       return [{ label: `None`, value: `` }, ...listReturn];
//     }
//     return listReturn;
//   }
//   return [{ label: `None`, value: `` }, ...list];
// };

export const getErrorMsg = (error) => {
  if (error?.response?.data?.error?.message) {
    return error.response.data.error.message;
  }

  if (error?.response?.data?.message) {
    return error?.response?.data?.message;
  }

  if (error?.response?.data?.detail) {
    return error?.response?.data?.detail;
  }

  return `Something wrong!`;
};

export const encodeRefreshToken = (refreshToken = ``) => {
  return encodeURI(refreshToken);
};

export const decodeRefreshToken = (refreshTokenEncoded = ``) => {
  return decodeURI(refreshTokenEncoded);
};

// export const getStaticPropsHelper = async (queriesKey, api) => {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery([queriesKey], api);

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

// export const flatAllPages = (data) => {
//   //! Use for infiniteQuery
//   if (data) {
//     if (data.pages) {
//       return flattenDeep(data.pages.map((el) => el.data)).filter((el) => !!el);
//     }

//     return [];
//   }

//   return [];
// };

// export const orderObjectKey = (orderKey, dataNeedToConvert) => {
//   return dataNeedToConvert.map((el) => {
//     const orderObj = {};
//     for (let i = 0; i <= orderKey.length - 1; i++) {
//       orderObj[orderKey[i]] = el[orderKey[i]];
//     }
//     return orderObj;
//   });
// };

// export const getNameFromValue = (questionType) => {
//   const nameQuestionType = upperFirst(questionType.replace(/_/g, " "));

//   return nameQuestionType;
// };

// export const getQuestionTypesNames = (questionPart) => {
//   if (isEmpty(questionPart)) return "";
//   const questionTypes = [
//     ...new Set(questionPart.map((item) => item.question_type)),
//   ];
//   const questionTypeLabel = questionTypes
//     .map((type) => getNameFromValue(type))
//     .join(", ");
//   return questionTypeLabel ?? "";
// };

// export const parseQueryString = () => {
//   const search = window.location.search;
//   return querystring.parse(search);
// };
