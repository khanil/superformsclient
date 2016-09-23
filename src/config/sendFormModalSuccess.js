const sendFMSuccessConfig = (formId) => ({
  body: { 
    __html: 
    `<div class="form-group has-success">
      <label class='control-label'>Ссылка на форму</label>
      <input type="text" class="form-control" value=${'http://' + window.location.host + '/forms/' + formId} readOnly>
    </div>`
  }
});

export default sendFMSuccessConfig;