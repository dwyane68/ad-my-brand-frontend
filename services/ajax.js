import axios from 'axios';

export default (type, url, data, options = {}) => {
  return new Promise((resolve, reject) => {
    let axiosParams = {
      method : type,
      url : url,
    };
    if(options){
      axiosParams = {...axiosParams, ...options};
    }
    if (type === 'get') { axiosParams.params = data} else { axiosParams.data = data}
    axios(axiosParams)
      .then((successResult) => {
        const { error, payload, message } = successResult.data;
        if(error){
          reject(error);
        } else {
          resolve({...payload, message});
        }
      })
      .catch((errorResult) => {
        if (!errorResult.response) {
          reject({
            code: 'ERROR',
            message: 'WE are under maintenance!'
          })
        } else {
          const response = errorResult.response.data;
          reject(response.error);
        }
      });
  });
};
