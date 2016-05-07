(function () {

	document.getElementById('submit').addEventListener('click', signIn, false);

	function signIn() {
		var user = getUserData();
    if(user.email && user.password.length >= 8) {
  		sendRequest('POST', '/signin', JSON.stringify(user), function(xhr) {
        document.location.href = '/';
  		})
    } else {
      showError('Неверный пароль.')
      clearPassword();
    }
	}
  

	function sendRequest(method, url, sentData, responseHandler) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true) ;
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.onload = function () {
      if (xhr.status != 200) {
        showError(xhr.response);
        clearPassword();
      } else {
        responseHandler(xhr);
      }
    }

    xhr.send(sentData);
  }


  function clearPassword() {
    document.getElementById('password').value = '';
  }

  function getUserData() {
    return {
      email : document.getElementById('login').value,
      password : document.getElementById('password').value
    }
  }

  function showError(errorText) {
    error.textContent = errorText;
    error.setAttribute('class', 'alert alert-danger');
  }

}) ();