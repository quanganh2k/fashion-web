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

export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
};
