import { LIST } from './../constants/questionTypes';
import * as errorLabels from './../constants/errorLabels';

const isEmpty = (value) => (
  value === undefined || value === null || value === ''
);

const validate = ( 
  {
    name,
    //description,
    questions // [] of { title, description, type, options }
  }
) => {

  const errors = {};
  errors.questions = questions.map( () => ( {} ) );

  if ( isEmpty(name) ) {
    errors.name = errorLabels.EMPTY;
  }

  questions.forEach( (question, i) => {

    let { title, /*description,*/ type, options } = question;

    if ( isEmpty(title) ) {
      errors.questions[i].title = errorLabels.EMPTY;
    }

    if ( isEmpty(type) ) {
      errors.questions[i].type = errorLabels.EMPTY;
    }

    if ( type === LIST.value ) {

      if ( options.length < 2 ) {

        errors.questions[i].type = errorLabels.LACKS_OPTIONS;

      } else {

        let j = 0;
        let max = options.length;
        while ( j < max-1 && !isEmpty(options[j]) ) {
          j++;
        }
        if ( isEmpty(options[j]) ) {
          errors.questions[i].type = errorLabels.HAS_EMPTY_OPTIONS;
        }

      }

    }

  });

  return errors;
}

export default validate;