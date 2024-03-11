const axios = require('axios')

const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, params, headers) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    params: params ? params : null,
    headers: headers ? headers : null
  })
}
