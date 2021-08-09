import config from '../config';

const STATUS_NOT_SUCCESS = status => status < 200 || status > 399;

export default class CustomHttpService {
  fetch = async ({endpoint, body = {}, method = 'get', headers = {}}) => {
    let fullApiPath = `${config.API_PATH}${endpoint}`;

    let fetchOptions = {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (method === 'post') {
      fetchOptions.body = JSON.stringify(body);
    }

    return this._doFetch(fullApiPath, fetchOptions);
  };

  _doFetch = (fullApiPath, fetchOptions) => {
    return new Promise((resolve, reject) => {
      fetch(fullApiPath, fetchOptions)
        .then(res => {
          res
            .json()
            .then(data => {
              if (STATUS_NOT_SUCCESS(res.status)) {
                const {errors, error} = data;
                if (errors && Array.isArray(errors)) {
                  reject(errors[0].msg);
                } else if (error) {
                  reject(error);
                } else {
                  reject();
                  if (__DEV__) {
                    console.log(data);
                  }
                }
              } else {
                resolve(data);
              }
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  };
}
