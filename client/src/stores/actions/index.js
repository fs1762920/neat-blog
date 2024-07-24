const setToken = (value) => {
    return {
      type: "SET_TOKEN",
      payload: value,
    };
  };
  
  const cleanToken = () => {
    return {
      type: "CLEAN_TOKEN",
      payload: null,
    };
  };
  
  const setUserInfo = (value) => {
    return {
      type: "SET_USER_INFO",
      payload: value,
    };
  };
  
  const cleanUserInfo = () => {
    return {
      type: "CLEAN_USER_INFO",
      payload: {},
    };
  };
  
  export {
    setToken,
    cleanToken,
    setUserInfo,
    cleanUserInfo
  };
  