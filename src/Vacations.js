import React from 'react';
import moment from 'moment';

function Vacations(props) {
  console.log();
  return props.vacations.map(function(vacation, i) {
    const formatTime = time => {
      return moment(time).format('dddd MM/DD/YYYY');
    };
    let key = 'vacation' + i;

    var x = moment(vacation.startDate);
    var y = moment(vacation.endDate);
    var duration = moment.duration(y.diff(x));
    var days = duration.asDays();
    return (
      <div className="vacation" key={key}>
        <span>
          {moment(vacation.startDate)
            .add(1, 'day')
            .format('dddd MM/DD/YYYY ')}{' '}
          to{' '}
          {moment(vacation.endDate)
            .add(1, 'day')
            .format('dddd MM/DD/YYYY')}{' '}
          ({days} days)
        </span>
        <button
          className="destroyVacation"
          onClick={() => props.destroyVacation(vacation)}
          index={i}
        >
          X
        </button>
      </div>
    );
  });
}

export default Vacations;
