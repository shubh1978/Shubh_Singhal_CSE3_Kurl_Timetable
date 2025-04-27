import React, {useState, useEffect, memo} from 'react';

const CurrentPeriod = ({
  shiftStartTimeStamp, // Shift start time as a timestamp
  durationOfZeroPeriod, // in minutes
  durationOfLunch, // in minutes
  durationOfPeriod, // in minutes
  numberOfPeriods,
  className,
  style,
}) => {
  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [shiftEnded, setShiftEnded] = useState(false);
  const [totalperiod, setTotalPeriod] = useState(null);

  const calculateCurrentPeriod = () => {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds since epoch
    const shiftStart = shiftStartTimeStamp; // Assuming shiftStartTimeStamp is also in seconds since epoch


    // Convert durations from minutes to seconds
    const zeroPeriodSecs = durationOfZeroPeriod * 60;
    const lunchSecs = durationOfLunch * 60;
    const periodSecs = durationOfPeriod * 60;

    const periods = [zeroPeriodSecs]; // Start with zero period
    let totalTime = zeroPeriodSecs;

    // Add lunch duration to periods for calculation purposes
    periods.push((totalTime += lunchSecs));

    // Calculate start times for all periods after lunch
    for (let i = 1; i <= numberOfPeriods; i++) {
      totalTime += periodSecs;
      periods.push(totalTime);
    }

    const currentTimeSinceShiftStart = now - shiftStart;
    // Check if shift has ended
    if (currentTimeSinceShiftStart >= totalTime) {
      setShiftEnded(true);
      return;
    }

    // Find current period
    let period = periods.findIndex(time => currentTimeSinceShiftStart < time);
    if (period === -1) period = periods.length; // After the last period but before the shift ends
    setCurrentPeriod(period - 1); // Adjust for zero index
  };

  useEffect(() => {
    calculateCurrentPeriod();
    const interval = setInterval(() => {
      calculateCurrentPeriod();
    }, 60000);

    return () => clearInterval(interval);
  }, [
    shiftStartTimeStamp,
    durationOfZeroPeriod,
    durationOfLunch,
    durationOfPeriod,
    numberOfPeriods,
  ]);

  return (
    <div>
      {shiftEnded ? (
        <p className={`${className}`} style={style}>
          Shift Ended
        </p>
      ) : (
        <p className={`${className}`} style={style}>
          Current Period - {currentPeriod >= 0 ? currentPeriod : 'end'}
        </p>
      )}
    </div>
  );
};

export default memo(CurrentPeriod);
