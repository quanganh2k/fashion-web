import { useMutation, useQuery } from "react-query";
import { useContext } from "react";
import authServices from "../../services/authServices";
import { AuthContext } from "../../providers/authProviders";
import { getErrorMsg } from "../../helpers";
import { showError } from "../../helpers/toast";
import { queryKeys } from "../../constants/queryKeys";

export const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth
}

export const useLogin = () => {
    return useMutation(authServices.login)
}

export const useRegister = () => {
    return useMutation(authServices.register)
}

export const useGetInfoUser = () => {
    return useQuery(queryKeys.GET_INFO_USER, authServices.getUser)
}
