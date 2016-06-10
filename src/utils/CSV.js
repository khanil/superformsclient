/*
  Операции для работы с выгрузкой в CSV
 */

export function download(csv, filename) {
  let data, link;

  if (csv == null) return;

  if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
  }

  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.style = 'visibility:hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log(csv);
}