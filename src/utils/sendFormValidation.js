import * as errorLabels from './../labels/validationErrors';

const isEmpty = (value) => (
  value === undefined || value === null || value === ''
);

const validate = ({
  recipients
}) => {

  const errors = {};
  
  if (isEmpty(recipients)) {
    errors.recipients = errorLabels.EMPTY;
  } else {
    if ( !/^(\s*([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}($|\s|[,]))+$/.test(recipients) ) {
      errors.recipients = errorLabels.EMAIL_STRING_INVALID;
    }
  }

  return errors;
}

export default validate;