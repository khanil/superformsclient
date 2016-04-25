# forms
 My graduation work for ITMO University
 
 Using webpack
 
 Please set NODE_ENV environment variable before using npm commands.
 
 "NODE_ENV = development" and "npm start" will allow you to develope with hot reload and source maps
 
 "NODE_ENV = production" and "node server.js" will start simple server and allow you to test functional
 
 "NODE_ENV = production" and "webpack" will allow you to build .min.js scripts
 
 (!)DON'T forget to edit webpack.config file

# Actual tasks
- [ ] Вынести контейнер из компонента interview

# 25/04/16
- [x] Дать порядковые номера вопросам
- [x] Изменить иконки стрелок
- [x] Добавить нумерацию вопросов на странице заполнения анкеты
- [x] Добавить наличие одного вопроса по умолчанию на странице генерации
- [x] Добавить валидацию на странице генерации
- [x] Улучшен файл webpack.config. Теперь сборка сразу всех min.js сразу, а не по одному

# 24/04/16
- [x] Добавить / изменить типы создаваемых вопросов
- [x] Добавить валидацию по типу вопроса