import axios from "axios";
import { API_BASE_URL } from "../api-constants";

export const apiHelper = (config, requestObject) => {
  const { headers, url, method, delay = 100 } = config;

  const apiURL = `${API_BASE_URL}${url}`;

  const apiConfig: any = {
    headers,
    method,
    url: apiURL,
  };

  if (requestObject) {
    apiConfig.data = requestObject;
  }

  return getResult(apiConfig, delay);
};

export const getResult = async (axiosOptions, delay): Promise<any> => {
  let result: any = {};
  try {
    result = await axios(axiosOptions);
    if (result.data === null) {
      result.data = {
        Fault: {
          Code: 100,
        },
      };
    }
  } catch (err) {
    result.data = { error: "Error" };
  }

  return new Promise((res, rej) => {
    setTimeout(() => {
      res(result.data);
    }, delay);
  });
};
