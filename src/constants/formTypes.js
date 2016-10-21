/*
  Типы генерируемых форм
  Массив всех типов - ALL
 */

export const MONITORING = {
  value: 'monitoring',
  label: 'Мониторинг'
}

export const INTERVIEW = {
  value: 'interview',
  label: 'Опрос'
}

export const VOTING = {
  value: 'voting',
  label: 'Голосование'
}

export const SURVEY = {
  value: 'survey',
  label: 'Анкетирование'
}

export const REQUEST = {
  value: 'request',
  label: 'Запрос'
}

export const OTHER = {
  value: 'other',
  label: 'Другое'
}

export const TEST = {
  value: 'test',
  label: 'Проба'
}

export const ALL = [
  SURVEY, VOTING, REQUEST, MONITORING, INTERVIEW, TEST, OTHER
];
