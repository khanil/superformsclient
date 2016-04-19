function sendRequest(method, url, sentData, responseHandler) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url, true) ;
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  xhr.onload = function () {
    
    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      responseHandler(xhr);
    }
  }

  xhr.send(sentData);
}

export default sendRequest;