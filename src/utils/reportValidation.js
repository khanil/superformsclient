import * as errorLabels from './../labels/validationErrors';

const isEmpty = (value) => (
  value === undefined || value === null || value === ''
);

const validate = ({
  columns // [] of {questionTitle, action, newTitle}
}) => {

  const errors = {};
  errors.columns = columns.map( () => ( {} ) );

  columns.forEach( (column, i) => {

    let { questionTitle, action, newTitle } = column;

    if ( isEmpty(questionTitle) ) {
      errors.columns[i].questionTitle = errorLabels.EMPTY;
    }

    if ( isEmpty(action) ) {
      errors.columns[i].action = errorLabels.EMPTY;
    }

    if ( isEmpty(newTitle) ) {
      errors.columns[i].newTitle = errorLabels.EMPTY;
    }

  });

  return errors;
}

export default validate;