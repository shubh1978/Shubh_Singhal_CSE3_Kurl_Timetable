import React, {useEffect, useState} from 'react';
import '../assets/css/SchoolModal.css';
import '../assets/css/ShiftModal.css';
import {Accordion} from 'react-bootstrap';
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from 'axios';
import moment from 'moment';

import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import InputTag from './InputTag';
import SelectTag from './SelectTag';
import {useSelector} from 'react-redux';
import {addShift} from '../services/operations/shiftOperations';
import {Days, position, saturdayOptions} from '../utils/constants';
import {ShiftmodelValidation} from '../utils/validation';
import {json} from 'react-router-dom';
import {CloudCog} from 'lucide-react';
// import { Select } from "antd";

const ShiftModal = ({getShiftList, setShow, getTimeStamp, campusesData}) => {
  const [isSaturday, setIsSaturday] = useState(false);
  const {selectedSchool, selectedCampus} = useSelector(state => state.userInfo);
  const [isFieldEnabled, setIsFieldEnabled] = useState(false);
  const [formData, setFormData] = useState({
    campus_id: selectedCampus?.id,
    daysInWeek: [],
    durationOfExtraPeriod: 0,
    durationOfLunch: 0,
    durationOfPeriod: 0,
    durationOfZeroPeriod: 0,
    extraPeriod: false,
    lunchAfterPeriod: null,
    name: '',
    periodOnSaturday: null,
    saturday: 'FIRST_OFF',
    nameOfExtraPeriod: '',
    nameOfZeroPeriod: '',
    numberOfPeriods: 0,
    summerEndTime: 0,
    summerStartTime: 0,
    winterEndTime: 0,
    winterStartTime: 0,
    zeroPeriod: false,
    zeroPeriodStart: '',
    zeroPeriodStartTime: 0,
    zeroPeriodEndTime: 0,
  });

  const [timeData, setTimeData] = useState({
    summerEndTime: null,
    summerStartTime: null,
    winterEndTime: null,
    winterStartTime: null,
    durationOfPeriod: null,
    durationOfZeroPeriod: null,
    durationOfLunch: null,
  });

  const [durationOfShift, setDurationOfShift] = useState('');
  const [durationOfZeroPeriod, setDurationOfZeroPeriod] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [numberOfPeriodsOnSat, setNumberOfPeriodsOnSat] = useState(0);

  function calculateEndTime(fromTime) {
    const endTime =
      formData.numberOfPeriods * formData.durationOfPeriod +
      formData.durationOfZeroPeriod +
      formData.durationOfLunch;
    const timeString = moment.utc(endTime).format('HH:mm');
    setDurationOfShift(timeString);
    const startTime = moment(timeString, 'HH:mm');
    const duration = moment.duration(fromTime, 'HH:mm');
    const tt = startTime.add(duration);
    return tt.format('HH:mm');
  }
  // function calculateZeroEndTime(fromTime) {
  //   const endTime = formData.durationOfZeroPeriod;

  //   const timeString = moment.utc(endTime).format('HH:mm');
  //   setDurationOfZeroPeriod(timeString);
  //   const startTime = moment(timeString, 'HH:mm');
  //   const duration = moment.duration(fromTime, 'HH:mm');
  //   const tt = startTime.add(duration);
  //   return tt.format('HH:mm');
  // }
  const handleZeroPeriodCheck = event => {
    setFormData({...formData, zeroPeriod: event.target.checked});
    setIsFieldEnabled(event.target.checked);
  };

  const convertToTimestamp = (date, time) => {
    const dateString = `${date} ${time}`;
    const dateTimeParts = dateString.split(' ');
    const timeParts = dateTimeParts[1].split(':');
    const dateParts = dateTimeParts[0].split('-');
    const timestamp = new Date(
      parseInt(dateParts[2], 10),
      parseInt(dateParts[1], 10) - 1,
      parseInt(dateParts[0], 10),
      parseInt(timeParts[0], 10),
      parseInt(timeParts[1], 10),
    ).getTime();

    return timestamp;
  };

  function addTimesAndCheck(time1, time2) {
    const parts1 = time1.split(':').map(part => parseInt(part, 10));
    const parts2 = time2.split(':').map(part => parseInt(part, 10));
    let totalMinutes1 = parts1[0] * 60 + parts1[1];
    let totalMinutes2 = parts2[0] * 60 + parts2[1];
    if (totalMinutes1 > totalMinutes2) {
      return false;
    }
    return true;
  }

  const handleInputChange = (e, v) => {
    const {name, value} = e.target;

    if (
      name === 'winterStartTime' ||
      name === 'winterEndTime' ||
      name === 'summerStartTime' ||
      name === 'summerEndTime' 
    ) {
      const today = new Date();
      const date = moment(today).format('DD-MM-YYYY');
      const timeStamp = convertToTimestamp(date, value);

      if (!addTimesAndCheck(value, calculateEndTime(value))) {
        toast.error('start time should be earlier than end time');
      }

      setTimeData({...timeData, [name]: value});
      if (name === 'summerStartTime') {
        setTimeData({...timeData, summerEndTime: calculateEndTime(value)});
        const endStamp = convertToTimestamp(date, calculateEndTime(value));

        setFormData({
          ...formData,
          [name]: timeStamp,
          summerEndTime: endStamp,
        });
      } else if (name === 'winterStartTime') {
        setTimeData({...timeData, winterEndTime: calculateEndTime(value)});
        const endStamp = convertToTimestamp(date, calculateEndTime(value));

        setFormData({
          ...formData,
          [name]: timeStamp,
          winterEndTime: endStamp,
        });
      }
    } else if (name === 'period') {
      setFormData(prevFormData => ({
        ...prevFormData,
        numberOfPeriods: Number(v), // Ensure value is a number
      }));
    } else if (
      name === 'durationOfPeriod' ||
      name === 'durationOfLunch' ||
      name === 'durationOfZeroPeriod' ||
      name === 'durationOfExtraPeriod'
    ) {
      // Add the entered value (in minutes) to the timestamp
      const adjustedTimestamp = value * 60 * 1000;

      // Update the formData state
      setFormData({
        ...formData,
        [name]: adjustedTimestamp,
      });
      setTimeData({...timeData, [name]: value});
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  function addTimesAndCheck(time1, time2) {
    const parts1 = time1.split(':').map(part => parseInt(part, 10));
    const parts2 = time2.split(':').map(part => parseInt(part, 10));

    let totalMinutes1 = parts1[0] * 60 + parts1[1];
    let totalMinutes2 = parts2[0] * 60 + parts2[1];

    // let totalMinutes = totalMinutes1 + totalMinutes2;

    if (totalMinutes1 > totalMinutes2) {
      return false;
    }

    return true;
  }

  const calculateTimeDifference = (start, end) => {
    const startTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);

    let timeDifference = endTime - startTime;

    if (timeDifference < 0) {
      [startTime, endTime] = [endTime, startTime];
      timeDifference = -timeDifference;
    }

    if (!start || !end) {
      // Return an empty string if either start or end is not provided
      return '';
    }
    if (isNaN(startTime) || isNaN(endTime)) {
      // Return an empty string if either startTime or endTime is not a valid date
      return '';
    }

    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    const hours = Math.floor(minutesDifference / 60);
    const minutes = minutesDifference % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;

  };

  const handleSubmit = e => {
    if (ShiftmodelValidation(formData, timeData)) {
      addShift(formData, setShow, getShiftList);
    }
  };

  const handleCheckboxChange = option => {
    if (selectedDays.includes(option)) {
      setSelectedDays(selectedDays.filter(day => day !== option));
    } else {
      setSelectedDays([...selectedDays, option]);
    }
  };
  useEffect(() => {
    if (selectedDays.length === 0) {
      setNumberOfPeriodsOnSat(0); // Reset number of periods to 0
    }
  }, [selectedDays]);

  return (
    <>
      <div
        className="scrollable-container"
        style={{height: '350px', overflow: 'scroll'}}>
        <form className="ModalForm no-bg">
          <div style={{marginBottom: '5px'}}>
            <InputTag
              // style={{width: '100%', height: '45px'}}
              placeholder="Shift Name*"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* <div>
            <ul className="flex daysList">
              {formData.daysInWeek.map((selectedDay, idx) => (
                <li key={idx}>{selectedDay}</li>
              ))}
            </ul>
          </div> */}
          <SelectTag
            placeholder={'No. of Days'}
            formData={formData}
            dayOn={false}
            isOpen={true}>
            {Days.map((days, idx) => (
              <div className="menu-down-shift" key={idx}>
                <input
                  type="checkbox"
                  checked={formData.daysInWeek.includes(days.DayName)}
                  onChange={e => {
                    const updatedDaysInWeek = formData.daysInWeek.includes(
                      days.DayName,
                    )
                      ? formData.daysInWeek.filter(day => day !== days.DayName)
                      : [...formData.daysInWeek, days.DayName];

                    // if(e.target.checked==="SATURDAY"){
                    //   setIsSaturday(true);
                    // }

                    setFormData({...formData, daysInWeek: updatedDaysInWeek});
                  }}
                  style={{width: '14px', height: '14px'}}
                />
                {days.DayName}
              </div>
            ))}
          </SelectTag>

          <div className="d-flex">
            <SelectTag
              placeholder="Saturday"
              // disabled={!isFieldEnabled}
            >
              {saturdayOptions.map((option, idx) => (
                <div className="menu-down-shift" key={idx}>
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(option.opr)}
                    onChange={() => handleCheckboxChange(option.opr)}
                    // checked={formData.daysInWeek.includes(days.DayName)}
                    // onChange={e => {
                    //   const updatedDaysInWeek = formData.daysInWeek.includes(
                    //     days.DayName,
                    //   )
                    //     ? formData.daysInWeek.filter(
                    //         day => day !== days.DayName,
                    //       )
                    //     : [...formData.daysInWeek, days.DayName];

                    //   setFormData({...formData, daysInWeek: updatedDaysInWeek});
                    // }}
                    style={{width: '14px', height: '14px'}}
                  />
                  {option.opr}
                </div>
              ))}

              <p className="text-danger">
                *If not checked that means that saturday is off and may change
                depending on the situation by the higher authorities.
              </p>

              <InputTag
                placeholder="No. of periods on saturday"
                type="text"
                // number={true}
                value={formData.periodOnSaturday}
                name="periodOnSaturday"
                onChange={handleInputChange}
                disabled={selectedDays.length === 0}
                min={0}
              />
            </SelectTag>
          </div>

          <div className="d-flex">
            <InputTag
              className="fixed-height"
              placeholder="No. of Periods in a Week"
              type="number"
              name="numberOfPeriods"
              value={timeData.numberOfPeriods}
              onChange={handleInputChange}
              // number={true}
              required
            />
            <InputTag
              className="fixed-height"
              placeholder="Duration of periods (in min)*"
              type="number"
              name="durationOfPeriod"
              value={timeData.durationOfPeriod}
              onChange={handleInputChange}
              // number={true}
              required
            />
          </div>

          <div className="d-flex">
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}>
              <input
                style={{height: '10px', width: '10px'}}
                type="checkbox"
                name="zeroPeriod"
                value={formData.zeroPeriod}
                checked={isFieldEnabled}
                onChange={handleZeroPeriodCheck}
              />
              <label>If zero period available</label>
            </div>
            <InputTag
              placeholder="Duration of Zero Period(in min)"
              type="number"
              // number={true}
              name="durationOfZeroPeriod"
              value={timeData.durationOfZeroPeriod}
              onChange={handleInputChange}
              disabled={!isFieldEnabled}
            />
          </div>
          <div className="d-flex">
            <SelectTag
              placeholder="Position of zero period*"
              // disabled={!isFieldEnabled}
            >
              {position.map((pos, idx) => (
                <div className="menu-down-shift" key={idx}>
                  <input
                    type="checkbox"
                    disabled={!isFieldEnabled}
                    style={{width: '14px', height: '14px', accentColor: 'red'}}
                    checked={formData?.zeroPeriodStart === pos.set}
                    onChange={e => {
                      setFormData({...formData, zeroPeriodStart: pos.set});
                    }}
                  />
                  {pos.set}
                </div>
              ))}
            </SelectTag>
          </div>
          <InputTag
            placeholder="Name of zero period*"
            type="text"
            name="nameOfZeroPeriod"
            value={formData.nameOfZeroPeriod}
            onChange={handleInputChange}
            disabled={!isFieldEnabled}
          />

          <div className="d-flex">
            <InputTag
              placeholder="Lunch after periods*"
              type=" number"
              // number={true}
              name="lunchAfterPeriod"
              value={formData.lunchAfterPeriod}
              onChange={handleInputChange}
              required
            />
            <InputTag
              placeholder="Duration of Lunch (in min)*"
              type="number"
              // number={true}
              name="durationOfLunch"
              value={timeData.durationOfLunch}
              onChange={handleInputChange}
              required
            />
          </div>

          <p>Summer Timings</p>
          <div className="d-flex" style={{marginTop: '-20px'}}>
            <InputTag
              style={{marginLeft: '0px'}}
              placeholder="Start Time*"
              type="time"
              name="summerStartTime"
              value={timeData.summerStartTime}
              onChange={handleInputChange}
              // onInput={handleTimeSelection}
              required
            />

            <InputTag
              style={{marginLeft: '0px'}}
              placeholder="End Time*"
              type="time"
              name="summerEndTime"
              min={timeData.summerStartTime}
              value={timeData.summerEndTime}
              pattern="[0-9]{2}:[0-9]{2} [APap][mM]"
              title="Please enter a valid time in HH:MM AM/PM format"
              onChange={e => {
                if (e.target.value > timeData.summerStartTime) {
                  handleInputChange(e);
                } else {
                  toast.error(
                    'error: End time should be greater than start time',
                    {autoClose: 300},
                  );
                }
              }}
              required
            />
          </div>
          <p style={{color: 'red', fontSize: '13px', marginTop: '-10px'}}>
            Duration of Summer Shifts:{' '}
            {/* {calculateTimeDifference(
              timeData.summerStartTime,
              timeData.summerEndTime,
            )} */}
            {durationOfShift}
          </p>
          <p style={{marginTop: '6px'}}>Winter Timings</p>
          <div className="d-flex" style={{marginTop: '-20px'}}>
            <InputTag
              style={{marginLeft: '0px'}}
              placeholder="Start Time*"
              type="time"
              name="winterStartTime"
              value={timeData.winterStartTime}
              onChange={handleInputChange}
              required
            />
            <InputTag
              style={{marginLeft: '0px'}}
              placeholder="End Time*"
              type="time"
              name="winterEndTime"
              min={timeData.winterStartTime}
              value={timeData.winterEndTime}
              onChange={e => {
                if (e.target.value > timeData.winterStartTime) {
                  handleInputChange(e);
                } else {
                  toast.error(
                    'error: End time should be greater than start time',
                    {autoClose: 200},
                  );
                }
              }}
              required
            />
          </div>
          <p style={{color: 'red', fontSize: '13px', marginTop: '-10px'}}>
            Duration of Winter Shifts:{' '}
            {/* {calculateTimeDifference(
              timeData.summerStartTime,
              timeData.summerEndTime,
            )} */}
            {durationOfShift}
          </p>
          <InputTag
            textareaOn={true}
            style={{marginLeft: '0px'}}
            placeholder="Remark"
            type="text"
            name="remark"
            value={formData?.remark}
            onChange={handleInputChange}
            required
          />
        </form>
      </div>
      <div
        style={{
          marginTop: '10px',
          flex: 'end',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <button
          type="button"
          onClick={handleSubmit}
          className="addModalButton"
          style={{width: '45%'}}>
          Add +
        </button>
      </div>
    </>
  );
};

export default ShiftModal;
