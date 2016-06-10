# forms
 My graduation work for ITMO University
 
 Using webpack
 
 Please set NODE_ENV environment variable before using npm commands.
 
 "NODE_ENV = development" and "npm start" will allow you to develope with hot reload and source maps
 
 "NODE_ENV = production" and "node server.js" will start simple server and allow you to test functional
 
 "NODE_ENV = production" and "webpack" will allow you to build .min.js scripts
 
 (!)DON'T forget to edit webpack.config file

# Possible improvements
- [ ] Добавить возможность вставлять разделители между вопросами
- [ ] Добавить возможность прикреплять файл к вопросу
- [ ] Добавить всплывающие подсказки: пояснение к вводу
- [ ] Возможность менять цвет фона

# 30/05/16
- [x] Добавить фильтры на главную страницу
- [x] Добавить окно "Просмотр хода мониторинга"

# 27/05/16
- [x] Добавить конпку создания формы
- [x] Добавить всплывающие подсказки: пояснение к вводу, подсказка к вопросу

# до 12/05/16
- [x] Вынести контейнер из компонента interview
- [x] Добавить поле ввода типа опроса
- [x] Копирование вопроса
- [x] Список форм - Главная страница
- [x] Генерация отчетов
- [x] Добавить всплывающие подсказки на элементы управления (кнопки)

# 27/04/16
- [x] Привязан календарь и поле ввода времени к соответствующим полям
- [x] Добавлена тестовая (на скорую руку) страница генерации отчетов, с получением данных с сервера

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
