function sendRequest(method, url, sentData, successFn, errorFn) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url, true) ;
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  // xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  xhr.onload = function () {
    
    if (xhr.status != 200) {
      if (errorFn) errorFn(xhr.statusText);
    } else {
      if (successFn) successFn(xhr);
    }
  }

  xhr.send(sentData);
}

export default sendRequest;