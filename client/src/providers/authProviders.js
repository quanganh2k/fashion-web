import { getErrorMsg, encodeRefreshToken } from "../helpers";
import { showError, showSuccess } from "../helpers/toast";
import {
  useLogin,
  useGetInfoUser,
  useRegister,
} from "../hooks/authentication/useAuthentication";
import authServices from "../services/authServices";
import httpServices from "../services/httpServices";
import { isEmpty } from "lodash";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { REFRESH_TOKEN } from "../constants/api";

import { queryKeys } from "../constants/queryKeys";
import { useNavigate, Navigate } from "react-router-dom";
import { RouteBase } from "../constants/routeUrl";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  //! State
  const infoLocalStorage = authServices.getUserLocalStorage();
  const [isLogged, setLogged] = useState(!!infoLocalStorage?.accessToken);
  const [accessToken, setAccessToken] = useState(
    infoLocalStorage?.accessToken ?? ""
  );
  const [refreshToken, setRefreshToken] = useState(
    infoLocalStorage?.refreshToken ?? ""
  );

  const [userInfo, setUserInfo] = useState(infoLocalStorage?.user);
  const { mutateAsync: loginMutate, isLoading: isLogin } = useLogin();
  const { mutateAsync: registerMutate, isLoading: isRegister } = useRegister();
  const intervalRef = useRef();

  //! Function
  const saveInfoUser = useCallback(
    (payload) => {
      const { accessToken, user } = payload;
      setAccessToken(accessToken);

      setUserInfo(user);
      setLogged(true);

      authServices.saveUserLocalStorage({
        accessToken,
        user,
      });
    },
    [infoLocalStorage]
  );

  const updateUserInfo = useCallback(
    (payload) => {
      const user = payload;
      setUserInfo(user);
      authServices.saveUserLocalStorage({
        accessToken,
        user,
      });
    },
    [accessToken]
  );

  const getNewToken = async () => {
    const response = await authServices.refreshToken();
    if (response.data.accessToken) {
      authServices.saveUserLocalStorage({
        accessToken: response.data.accessToken,
      });

      const data = await authServices.getUser();
      setUserInfo(data?.data?.user);
      setLogged(true);
      authServices.saveUserLocalStorage({
        accessToken: response.data.accessToken,
        user: data?.data?.user,
      });
    }
  };

  const getToken = useCallback(() => {
    if (infoLocalStorage.accessToken !== null) {
      getNewToken();
    }
  }, []);

  //* Check Auth
  useEffect(() => {
    const interval = setInterval(() => getToken(), 14 * 60 * 1000);
    intervalRef.current = interval;
    return () => clearInterval(interval);
  }, [getToken]);

  // login
  const login = useCallback(
    async (email, password, onSuccess, onError) => {
      await loginMutate(
        { email, password },
        {
          onSuccess: (response) => {
            const { accessToken, user } = response?.data || {};

            saveInfoUser({
              accessToken,
              user,
            });
            showSuccess("Login successfully");
            onSuccess && onSuccess();
          },
          onError: (error) => {
            showError(getErrorMsg(error));
            onError && onError();
          },
        }
      );
    },
    [loginMutate, saveInfoUser]
  );

  // register
  const register = useCallback(async (data, onSuccess, onError) => {
    await registerMutate(data, {
      onSuccess: (response) => {
        const { message } = response?.data || {};
        showSuccess(message);
        onSuccess && onSuccess();
      },
      onError: (error) => {
        showError(getErrorMsg(error));
        onError && onError();
      },
    });
  });

  // logout
  const logout = useCallback(async () => {
    await authServices.logOut();
    setLogged(false);
    authServices.clearUserLocalStorage();
    showSuccess("Logout successfully");
  }, []);

  const memoedValue = useMemo(() => {
    return {
      isLogged,
      accessToken,
      refreshToken,
      isLogin,
      login,
      logout,
      userInfo,
      updateUserInfo,
      register,
    };
  }, [
    isLogged,
    refreshToken,
    accessToken,
    isLogin,
    login,
    logout,
    userInfo,
    updateUserInfo,
    register,
  ]);

  //! Render
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};
