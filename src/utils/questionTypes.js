import * as TYPES from './../constants/questionTypes';

export function isNumeric(type) {
  return (
    type === TYPES.INTEGER.value ||
    type === TYPES.FLOAT.value ||
    type === TYPES.FINANCIAL.value
  );
}