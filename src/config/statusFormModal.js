const statusFMConfig = (formId, formName) => ({
  title: 'Ход мониторинга',
  body: {
    __html:
    `<div class="form-group">
      <label class='control-label'>Ссылка на форму</label>
      <input type="text" class="form-control" value=${'http://' + window.location.host + '/forms/' + formId} readOnly>
    </div>`
  }
});

export default statusFMConfig;