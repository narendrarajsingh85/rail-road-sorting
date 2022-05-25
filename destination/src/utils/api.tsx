import { DESTINATION_BASE_URL, POST_METHOD, GET_METHOD } from "../api-constants";
import { apiHelper } from './client'

export const getDestinations = () => {
  const headers = {};
  return apiHelper(
      {
        headers, 
        url: `${DESTINATION_BASE_URL}`
      }, 
      null
      );
}

export const getDestination = (name) => {
  const headers = {};
  return apiHelper(
      {
        headers, 
        url: `${DESTINATION_BASE_URL}/${name}`,
        method: `${GET_METHOD}`
      }, 
      null
      );
}

export const addDestination = (request) => {
  const headers = {};
  return apiHelper(
      {
        headers, 
        url: `${DESTINATION_BASE_URL}`,
        method: `${POST_METHOD}`
      }, 
      request
      );
}
