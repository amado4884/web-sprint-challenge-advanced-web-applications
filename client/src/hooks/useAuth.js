import axios from "axios";
import useLocalStorage from "./useLocalStorage";

function useAuth(key, bearer = true) {
  const [token, setToken, removeToken] = useLocalStorage(key, null);

  const config = {
    headers: {
      Authorization: `${bearer ? "Bearer: " : ""}${token}`,
    },
  };

  return {
    get: async function (url, configP) {
      try {
        return await axios.get(url, configP ? configP : config);
      } catch (err) {
        return err;
      }
    },
    post: async function (url, data, configP) {
      try {
        return await axios.post(url, data ? data : null, configP ? configP : config);
      } catch (err) {
        return err;
      }
    },
    delete: async function (url, configP) {
      try {
        return await axios.delete(url, configP ? configP : config);
      } catch (err) {
        return err;
      }
    },
    put: async function (url, data, configP) {
      try {
        return await axios.put(url, data ? data : null, configP ? configP : config);
      } catch (err) {
        return err;
      }
    },
    patch: async function (url, data, configP) {
      try {
        return await axios.patch(url, data ? data : null, configP ? configP : config);
      } catch (err) {
        return err;
      }
    },

    loggedIn: function () {
      return token ? true : false;
    },

    login: async function (loginUrl, data, callBack, configP) {
      try {
        const response = await axios.post(loginUrl, data ? data : null, configP ? configP : config);
        const tokenResponse = callBack(response.data);

        if (tokenResponse) setToken(tokenResponse);

        return { success: true, error: null, token: tokenResponse };
      } catch (err) {
        return { success: false, error: err.message, token: null };
      }
    },

    logout: function () {
      removeToken();
    },

    setT: function (t) {
      setToken(t);
    },
  };
}

export default useAuth;
