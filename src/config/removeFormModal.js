const removeFMConfig = {
  body: { 
    __html: 
    `<div class='alert alert-danger' role='alert'>
      <p><b>Внимание!</b></p>
      <p>Нажав на кнопку &laquo;Удалить&raquo;, вы безвозвратно <b>потеряете все ответы</b> и <b>отчеты</b>, связанные с данной формой.</p>
      <p>Производите удаление, только если уверены в своих действиях.</p>
    </div>`
  },
  confirmBtn: {
    text: 'Удалить',
    style: 'btn-danger'
  },
  abortBtn: {
    style: 'btn-primary'
  }
}

export default removeFMConfig;