(function () {

  document.getElementById('submit').addEventListener('click', signUp, false);

  function signUp() {
    var user = getUserData();
    var error = document.getElementById('error');
    var errorText;

    if(user.email) {
      if(user.password)
        if(user.password.length >= 8)
          sendRequest('POST', '/signup', JSON.stringify(user), function(xhr) {
            document.location.href = '/';
          })
        else 
          errorText = 'Минимальная длина пароля - 8 символов.';
      else
        errorText = 'Пароли не совпадают.';
    } else {
      errorText = 'Введите почту.';
    }

    if(errorText) {
      showError(errorText);
      clearPasswords();
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
        clearPasswords();
      } else {
        responseHandler(xhr);
      }
    }

    xhr.send(sentData);
  }


  function clearPasswords() {
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
  }


  function getUserData() {
    var password = document.getElementById('password').value;
    return {
      email : document.getElementById('login').value,
      password : (password === document.getElementById('confirmPassword').value) ? password : ''
    }
  }


  function showError(errorText) {
    error.textContent = errorText;
    error.setAttribute('class', 'alert alert-danger');
  }

}) ();