import * as questionTypes from './../constants/questionTypes';
import * as errorLabels from './../labels/validationErrors';

// Все поля обязательны для заполнения

const isEmpty = (value) => (
  value === undefined || value === null || value === ''
);

const validate = ( values, { questions } ) => {
  const errors = {};

  if ( isEmpty(values['Автор']) ) {
    errors['Автор'] = errorLabels.EMPTY;
  }

  questions.forEach( (question) => {

    let title = question.title;

    if ( isEmpty(values[title]) ) {
      errors[title] = errorLabels.EMPTY;
      return;
    }

    let type = question.type;
    let value = values[title];

    switch (type) {

      case questionTypes.FLOAT.value:
        // Делитель точка или запятая, неограниченное кол-во знаков после делителя
        if ( !(/^[0-9]+[.,][0-9]+$/).test(value) ) {
          errors[title] = errorLabels.FLOAT;
        }
        break;

      case questionTypes.INTEGER.value:
        if ( !(/^[0-9]+$/).test(value) ) {
          errors[title] = errorLabels.INTEGER;
        }
        break;

      case questionTypes.FINANCIAL.value:
        // Делитель точка или запятая, два знака после запятой
        if ( !(/^[0-9]+[.,][0-9][0-9]$/).test(value) ) {
          errors[title] = errorLabels.FINANCIAL;
        }
        break;

      case questionTypes.DATE.value:
        break;

      case questionTypes.TIME.value:
        break;

      case questionTypes.STRING.value:
        break;

      default:
        break;

    }

  });

  return errors;
}

export default validate;