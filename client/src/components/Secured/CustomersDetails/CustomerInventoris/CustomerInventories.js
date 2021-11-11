import React, { useEffect, useState } from 'react';
import FormModel from '../../../FormModel/FormModel';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';

import { formatMoney } from '../../../../utils/formatting';
import api from '../../../../apis/api';

const CustomerInventories = ({ inventories }) => {
  console.log('inv', inventories[0]._id);
  const [isVisible, setIsVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(moment().hour(0).minute(0));
  const [duration, setDuration] = useState(30);
  const [maxBidders, setMaxBidders] = useState(10);
  const [maxRange, setMaxRange] = useState(15);
  const [currentSchdulerBottle, setCurrentSchdulerBottle] = useState(null);
  const secudule = {
    startDate: moment(),
    duration: 30,
    maxBidders: 20,
    maxRange: 35,
  };
  const format = 'HH:mm';

  const saveSchduler = () => {
    const mDate = moment(startDate);
    mDate.set({
      h: moment(startTime).format('HH'),
      m: moment(startTime).format('mm'),
    });
    console.log(mDate.format('DD/MM/yyyy HH:mm'));
    const secudule = {
      startDate: mDate,
      duration: duration,
      maxBidders,
      maxRange,
      auction: currentSchdulerBottle,
    };

    api.post('scheduler/');
    console.log(secudule);
    console.log(currentSchdulerBottle);
  };

  const onChange = (something) => {
    setStartTime(something);
  };
  return (
    <div className='p-2'>
      {inventories.map((inventory, index) => (
        <div
          className={` gap-5 flex p-2 rounded ${
            index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
          }`}
        >
          <div>{inventory.inventory.items[0].text}</div>
          <div>{inventory.inventory.items[1].text}</div>
          <div>{inventory.inventory.items[2].text}</div>
          <div>{formatMoney(inventory.inventory.items[3].text)}</div>
          <div>
            <button
              className='button bg-green-700 text-white '
              onClick={() => {
                setCurrentSchdulerBottle(inventory._id);
                setIsVisible((prev) => !prev);
              }}
            >
              Create Schedule
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
                value={duration}
                className='text-center'
                style={{ width: '55px' }}
                onChange={(e) => setDuration((prev) => e.target.value)}
              />
            </div>
          </div>
          <div className='pl-5'>
            <div className='flex gap-5'>
              <div className='flex gap-5'>
                <label>Max Bidders</label>
                <input
                  type='number'
                  value={maxBidders}
                  className='text-center'
                  style={{ width: '55px' }}
                  onChange={(e) => setMaxBidders(e.target.value)}
                />
              </div>
              <div className='flex gap-5'>
                <label>Max Range</label>
                <input
                  type='number'
                  value={maxRange}
                  className='text-center'
                  onChange={(e) => setMaxRange(e.target.value)}
                  style={{ width: '55px' }}
                />
                <span>%</span>
              </div>
            </div>
          </div>
          <div className='flex gap-5 mt-10'>
            <button
              className='bg-green-500 button text-white'
              onClick={saveSchduler}
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
