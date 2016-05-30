/*
  Типы генерируемых вопросов
  Массив всех типов - ALL_TYPES_ARRAY
 */

export const INTEGER = {
  value: 'integer',
  label: 'Целое число'
}

export const FLOAT = {
  value: 'float',
  label: 'Дробное число'
}

export const DATE = {
  value: 'date',
  label: 'Дата'
};

export const TIME = {
  value: 'time',
  label: 'Время'
};

export const STRING = {
  value: 'string',
  label: 'Строка'
};

export const PARAGRAPH = {
  value: 'paragraph',
  label: 'Абзац'
};

export const FINANCIAL = {
  value: 'financial',
  label: 'Финансы'
};

export const LIST = {
  value: 'list',
  label: 'Выбор из списка'
};

export const ALL_TYPES_ARRAY = [
    INTEGER, FLOAT, DATE, TIME, STRING, PARAGRAPH, FINANCIAL, LIST
];
