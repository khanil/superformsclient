import * as questionTypes from './../constants/questionTypes';
import * as errorLabels from './../constants/errorLabels';

const isEmpty = (value) => (
  value === undefined || value === null || value === ''
);

const validate = ( values, { questions } ) => {
  const answers = values.answers;
  const auth = values.auth;

  //Инициализируем объект содержащий ошибки
  const errors = {};
  errors.answers = questions.map(() => (''));

  console.log(auth);

  if ( isEmpty(auth) ) {
    errors.auth = errorLabels.EMPTY;
  }

  answers.forEach( (answer, i) => {

    console.log( i + '. ' + questions[ i ].type + ' : ' + answer);

    if ( isEmpty(answer) ) {
      errors.answers[i] = errorLabels.EMPTY;
    }

    switch ( questions[ i ].type ) {

      case questionTypes.FLOAT.value:
        // Делитель точка или запятая, неограниченное кол-во знаков после делителя
        if ( !(/^[0-9]+[.,][0-9]+$/).test(answer) ) {
          errors.answers[i] = errorLabels.FLOAT;
        }
        break;

      case questionTypes.INTEGER.value:
        if ( !(/^[0-9]+$/).test(answer) ) {
          errors.answers[i] = errorLabels.INTEGER;
        }
        break;

      case questionTypes.FINANCIAL.value:
        // Делитель точка или запятая, два знака после запятой
        if ( !(/^[0-9]+[.,][0-9][0-9]$/).test(answer) ) {
          errors.answers[i] = errorLabels.FINANCIAL;
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