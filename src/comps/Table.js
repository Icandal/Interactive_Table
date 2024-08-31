import React, { Component, Fragment } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Table.css';

//Создаю массив с данными, иммитирующий полученные данные с сервера

const POSITIONS = [{
    name: 'Выручка, руб',
    current: '500521',
    yesterday_value: '480521',
    day_of_week: '4805121',
    yesterday_percent_value: '+4%',
},
{
    name: 'Наличные',
    current: '300000',
    yesterday_value: '300000',
    day_of_week: '300000',
    yesterday_percent_value: '0%',
},
{
    name: 'Безналичный рассчет',
    current: '100000',
    yesterday_value: '100000',
    day_of_week: '100000',
    yesterday_percent_value: '0%',
},
{
    name: 'Кредитные карты',
    current: '100521',
    yesterday_value: '100521',
    day_of_week: '100521',
    yesterday_percent_value: '0%',
},
{
    name: 'Средний чек, руб',
    current: '1300',
    yesterday_value: '900',
    day_of_week: '900',
    yesterday_percent_value: '+44%',
},
{
    name: 'Средний гость, руб',
    current: '1200',
    yesterday_value: '800',
    day_of_week: '800',
    yesterday_percent_value: '+50%',
},
{
    name: 'Удаления из чека (после оплаты), руб',
    current: '1000',
    yesterday_value: '1100',
    day_of_week: '900',
    yesterday_percent_value: '-9%',
},
{
    name: 'Удаления из чека (до оплаты), руб',
    current: '1300',
    yesterday_value: '1300',
    day_of_week: '900',
    yesterday_percent_value: '0%',
},
{
    name: 'Колличество чеков',
    current: '34',
    yesterday_value: '36',
    day_of_week: '34',
    yesterday_percent_value: '-6%',
},
{
    name: 'Колличество гостей',
    current: '34',
    yesterday_value: '36',
    day_of_week: '32',
    yesterday_percent_value: '-6%',
}]

//Создаю компонент

class Table extends Component {

    //Ввожу состояние, которое копирует данные первой строки массива POSITIONS

    state = {
      chartData: [
        parseFloat(POSITIONS[0].current.replace(/\s/g, '')),
        parseFloat(POSITIONS[0].yesterday_value.replace(/\s/g, '')),
        parseFloat(POSITIONS[0].day_of_week.replace(/\s/g, ''))
      ]
    };

  //Создаю функцию, которая будет изменять значения состояния на новые, содержащиеся в строке

    handleClick = (event) => {
        const rowData = event.currentTarget.children;
        const current = parseFloat(rowData[1].textContent.replace(/\s/g, ''));
        const yesterday_value = parseFloat(rowData[2].textContent.split(' ')[0].replace(/\s/g, ''));
        const day_of_week = parseFloat(rowData[3].textContent.replace(/\s/g, ''));
        
      
        // console.log('Current:', current);
        // console.log('Yesterday value:', yesterday_value);
        // console.log('Day of week:', day_of_week);
      
        this.setState({
          chartData: [current, yesterday_value, day_of_week]
        });
      }

  //Отрисовываю получившиеся компоненты

    render() {
        return (
          <main>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                ...this.config,
                series: [{
                  name: 'Данные',
                  data: this.state.chartData
                }]
              }}
            />
          <table className="table">
            <thead>
              <tr>
                <th>Название</th>
                <th>Текущее значение</th>
                <th>Вчерашнее значение</th>
                <th>Значение за этот день недели</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {POSITIONS.map(({ name, current, yesterday_value, day_of_week, yesterday_percent_value }) => (
                <tr key={name} onClick={this.handleClick} className="table-row">
                  <td>{name}</td>
                  <td>{current}</td>
                  <td>{yesterday_value} {yesterday_percent_value}</td>
                  <td>{day_of_week}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      );
    }
  }
  
  export default Table;