import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

import { getWinningOffer } from '../../utils/customerUtils';
import useWindowDimensions from '../../hooks/hooks';

const BarChart = ({ customer }) => {
  const [inv, setInv] = useState([]);
  const [dates, setDates] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    setInv(customer.inventories.filter((x) => x.status === 3));
  }, [customer.inventories]);

  const { width } = useWindowDimensions();
  const tempData = [];
  useEffect(() => {
    const temp = [];
    const today = moment().add(-30, 'days');
    for (let i = 1; i <= 30; i++) {
      const currentDate = moment(today).add(i, 'days');
      let dayTotal = 0;
      for (let i = 0; i <= inv.length - 1; i++) {
        const cDate = moment(currentDate).format('DD-MM-YY');
        const invDate = moment(inv[i].expiration).format('DD-MM-YY');
        if (cDate === invDate) {
          dayTotal += parseInt(getWinningOffer(inv[i].offers));
          console.log(dayTotal);
        }
      }
      tempData.push(dayTotal);
      // setData([...data, dayTotal]);

      temp.push(moment(today).add(i, 'days').format('DD-MM-YY'));
    }

    //  /console.log('temp data', tempData);
    setDates(temp);
    setData(tempData);
    // console.log('inv', inv);
  }, [inv]);

  useEffect(() => {
    // console.log('data', data);
  }, [data]);

  return (
    <div>
      <div></div>
      <Bar
        data={{
          labels: dates,

          datasets: [
            {
              label: 'Sales',
              data: data,

              backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={width}
        options={{
          title: {
            text: 'asadsdasd',
          },
          layout: {
            padding: 20,
          },
          plugins: {
            tooltip: {
              enabled: true,
            },
            subtitle: {
              display: true,
              text: 'Sales in the past 30 days.',
              size: 20,
            },
            legend: {
              display: true,
              align: 'center',
              labels: {
                // This more specific font property overrides the global property
                font: {
                  size: 15,
                  fontColor: 'red',
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
