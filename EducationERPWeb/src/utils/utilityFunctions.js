export default function currentDate() {
  const options = {day: '2-digit', month: 'short', year: 'numeric'};
  return new Intl.DateTimeFormat('en-US', options).format(new Date());
}

export function currentTime() {
  const options = {hour: '2-digit', minute: '2-digit'};
  return new Intl.DateTimeFormat('en-US', options).format(new Date());
}

export const getCurrentPeriodAndTimeLeft = config => {
  const {
    summerStartTime,
    durationOfZeroPeriod,
    durationOfPeriod,
    numberOfPeriods,
    lunchAfterPeriod,
    durationOfLunch,
    zeroPeriod,
  } = config;

  let timePointer = summerStartTime;
  let periodLabel = '';
  let timeLeft = 0;

  const currentTime = Date.now();

  if (zeroPeriod) {
    if (
      currentTime >= timePointer &&
      currentTime < timePointer + durationOfZeroPeriod
    ) {
      periodLabel = 'Zero Period';
      timeLeft = timePointer + durationOfZeroPeriod - currentTime;
      return {periodLabel, timeLeft};
    }
    timePointer += durationOfZeroPeriod;
  }

  // Check Regular Periods
  for (let period = 1; period <= numberOfPeriods; period++) {
    if (
      currentTime >= timePointer &&
      currentTime < timePointer + durationOfPeriod
    ) {
      periodLabel = ` ${period}`;
      timeLeft = timePointer + durationOfPeriod - currentTime;
      return {periodLabel, timeLeft};
    }
    timePointer += durationOfPeriod;

    // Check Lunch Time
    if (period === lunchAfterPeriod) {
      if (
        currentTime >= timePointer &&
        currentTime < timePointer + durationOfLunch
      ) {
        periodLabel = 'Lunch';
        timeLeft = timePointer + durationOfLunch - currentTime;
        return {periodLabel, timeLeft};
      }
      timePointer += durationOfLunch;
    }
  }

  return {periodLabel: 'Shift Ended', timeLeft: 0};
};

export const formatTimeLeft = milliseconds => {
  const totalMinutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} Hrs ${minutes} Min`;
};

export function findSections(clas, sectionList) {
  const sectionIds = new Set(clas.sectionList.map(section => section.id));
  return sectionList
    .filter(section => sectionIds.has(section.id))
    .map(section => section.name).sort()
}

export function getTimeStamp(epochTimestamp) {
  const date = new Date(epochTimestamp);

  const hours = date.getHours().toString().padStart(2, '0'); // Padding with zero
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Padding with zero
  const seconds = date.getSeconds().toString().padStart(2, '0'); // Padding with zero

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
}
