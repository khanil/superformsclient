function http(uri, method, body) {
  return new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();
    xhr.open(method, uri, true) ;
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onload = function() {
      if (this.status == 200) {
        let response;
        try {
          response = JSON.parse(this.response);
        } catch(e) {
          response = this.response;
        }
        resolve(response);
      } else {
        const error = new Error();
        const { 
          responseURL, status, statusText
        } = this;
        error.message = `${responseURL} ${statusText} ${status}`;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error('Network Error'));
    };

    xhr.send(body);
  });
}

const methods = ['get', 'post', 'delete']

export default class ApiClient {
  constructor() {
    methods.forEach((method) => {
      this[method] = (path, body) => http(path, method, body);
    });
  }
}