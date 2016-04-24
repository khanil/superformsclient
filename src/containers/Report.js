import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Report extends Component {

  rows = [
    {
        id: 1,
        name: 'Product1',
        price: 120,
        x: 100,
        y: 12,
        z: 'OLOLOL'
    },{
        id: 2,
        name: 'Product2',
        price: 80,
        x: 100,
        y: 12,
        z: 'OLOLOL'
    }
  ];

  render() {

    let boilerplate = {
      questions: [
            {
                title: 'Предмет',
                description: '',
                type: 'Выбор из списка',
                options: [
                    'Математика',
                    'Физика',
                    'Биология',
                    'Физкультура'
                ]
            },
            {
                title: 'Выделенные часы',
                type: 'Строка',
                options: []
            },
            {
                title: 'Посещенные часы',
                type: 'Строка',
                options: []
            },
            {
                title: 'Средний балл',
                type: 'Строка',
                options: []
            },
            {
                title: 'Удовлетворенность предметом',
                type: 'Выбор из списка',
                options: [
                    '5',
                    '4',
                    '3',
                    '2',
                    '1'
                ]
            }
        ]
    };

    let headerColumnNames = [
      {
        id: '0',
        name: 'ФИО'
      }
    ];

    let part = boilerplate.questions.map( (question, index) => {
      return (
        {
          id: index + 1 + '',
          name: question.title
        }
      );
    });

    headerColumnNames = headerColumnNames.concat(part);

    console.log(headerColumnNames);

    let answersData = [
      {
          auth: 'Иванов Иван Иванович',
          answers: [
              'Математика',
              '122',
              '100',
              '4.5',
              '5'
          ]
      },
      {
          auth: 'Дмитриев Дмитрий Дмитриевич',
          answers: [
              'Физика',
              '140',
              '45',
              '3.4',
              '2'
          ]
      },
      {
          auth: 'Олежко Олег Олегович',
          answers: [
              'Биология',
              '12',
              '12',
              '5',
              '5'
          ]
      },
      {
          auth: 'Алексеев Алексей Алексеевич',
          answers: [
              'Физкультура',
              '95',
              '87',
              '4.6',
              '1'
          ]
      },
      {
          auth: 'Мариева Мария Мариевна',
          answers: [
              'Физкультура',
              '95',
              '15',
              '3',
              '3'
          ]
      },
      {
          auth: 'Петров Петр Петрович',
          answers: [
              'Математика',
              '124',
              '124',
              '5',
              '5'
          ]
      },
      {
          auth: 'Сергеев Сергей Сергеевич',
          answers: [
              'Биология',
              '110',
              '23',
              '3.9',
              '2'
          ]
      },
      {
          auth: 'Валентинов Валентин Валентинович',
          answers: [
              'Физика',
              '95',
              '78',
              '4.8',
              '4'
          ]
      }
    ];

    let rowsTest = answersData.map( (answerData) => {

      let res = {
        0: answerData.auth
      };

      answerData.answers.forEach((answer, index) => {
        res[index + 1] = answer;
      });

      return res;

    });

    console.log(rowsTest);

    return (
      <BootstrapTable data={rowsTest} striped={true} hover={true}>
        {
          headerColumnNames.map( (obj, index) => (
            <TableHeaderColumn
              isKey={index === 0}
              dataField={obj.id}
              key={index}
              width='300'
              dataSort={true}>{obj.name}</TableHeaderColumn>
          ))
        }

      </BootstrapTable>
    );

  }

}

export default Report;