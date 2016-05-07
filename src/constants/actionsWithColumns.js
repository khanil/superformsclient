/*
  Все возможные операции с полями при генерации отчетов
 */

import * as labels from './../labels/actionsWithColumns';

export const SUM = 'SUM';
export const AVERAGE = 'AVERAGE';
export const MIN = 'MIN';
export const MAX = 'MAX';
export const RANKING = 'RANKING';

export const ACTIONS_WITH_DIGITS = [
  {
    value: SUM,
    label: labels.SUM
  },
  {
    value: AVERAGE,
    label: labels.AVERAGE
  },
  {
    value: MIN,
    label: labels.MIN
  },
  {
    value: MAX,
    label: labels.MAX
  },
  {
    value: RANKING,
    label: labels.RANKING
  }
];

export const ACTIONS_WITH_OTHER_TYPES = [
  {
    value: RANKING,
    label: labels.RANKING
  }
];