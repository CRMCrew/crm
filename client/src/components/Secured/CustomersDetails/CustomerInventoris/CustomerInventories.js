import React, { useEffect, useState } from 'react';
import FormModel from '../../../FormModel/FormModel';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';

import { formatMoney } from '../../../../utils/formatting';

const CustomerInventories = ({ inventories }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(moment().hour(0).minute(0));

  const format = 'HH:mm';

  const onChange = (something) => {
    console.log(something);
  };
  return (
    <div className='p-2'>
      {inventories.map(({ inventory }, index) => (
        <div
          className={` gap-5 flex p-2 rounded ${
            index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
          }`}
        >
          <div>{inventory.items[0].text}</div>
          <div>{inventory.items[1].text}</div>
          <div>{inventory.items[2].text}</div>
          <div>{formatMoney(inventory.items[3].text)}</div>
          <div>
            <button
              className='button bg-green-700 text-white '
              onClick={() => setIsVisible((prev) => !prev)}
            >
              Schedule Sale
            </button>
          </div>
        </div>
      ))}
      <FormModel isVisible={isVisible}>
        <div>
          <div className='p-5 flex gap-5'>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <TimePicker
              showSecond={false}
              defaultValue={startTime}
              className='xxx'
              onChange={onChange}
              format={format}
              inputReadOnly
              minuteStep={5}
            />

            <div className='flex gap-3'>
              <label>Duration</label>{' '}
              <input
                type='number'
                value='30'
                className='text-center'
                style={{ width: '55px' }}
              />
            </div>
          </div>
          <div className='pl-5'>
            <div className='flex gap-5'>
              <div className='flex gap-5'>
                <label>Max Bidders</label>
                <input
                  type='number'
                  value='10'
                  className='text-center'
                  style={{ width: '55px' }}
                />
              </div>
              <div className='flex gap-5'>
                <label>Max Range</label>
                <input
                  type='number'
                  value='35'
                  className='text-center'
                  style={{ width: '55px' }}
                />
                <span>%</span>
              </div>
            </div>
          </div>
          <div className='flex gap-5 mt-10'>
            <button
              className='bg-green-500 button text-white'
              onClick={() => setIsVisible((prev) => !prev)}
            >
              Save Schedule
            </button>
            <button
              className='bg-red-500 button text-white'
              onClick={() => setIsVisible((prev) => !prev)}
            >
              Cancel
            </button>
          </div>
        </div>
      </FormModel>
    </div>
  );
};

export default CustomerInventories;
