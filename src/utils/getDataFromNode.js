/*
  Извлекает значения полей fields из элемента разметки с id содержащей json
  Возвращает объект значений
  Поле fatalError хранит информацию о наличии фатальной ошибки
 */

function getDataFromNode(id, fields) {
  const res = {};
  res.fatalError = false;

  try {

    let info = document.getElementById(id);

    info = JSON.parse(info.innerHTML);

    if (fields === 'ALL') {

      for (let key in info) {
        res[key] = info[key];
      }

    } else {

      fields.forEach( (field) => {
        if (info[field] === undefined) {
          console.error('Не предоставлено запрошенное поле ' + field + '.');
          res.fatalError = true;
          return res;
        }

        res[field] = info[field];
      });
    }

  } catch(e) {
    res.fatalError = true;

    switch (e.name) {

      case 'SyntaxError': 
        console.error('Предоставлен JSON с синтаксической ошибкой.');
        break;

      case 'TypeError':
        console.error('Не найден запрошенный элемент разметки с id = ' + id + '.');
        break;

      default:
        console.error(e);
    }
  }

  return res;
}

export default getDataFromNode;