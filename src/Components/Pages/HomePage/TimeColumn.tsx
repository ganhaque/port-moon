import Time from '../../Modules/Time';
import TimeKeeper from '../../Modules/TimeKeeper';
/* import Weather from '../../Modules/Weather'; */
import WeatherWidget from '../../Modules/WeatherWidget';

function TimeColumn() {
  return (
    <div className="flex-container column-flex-direction" id="column-2">
      <Time />
      <TimeKeeper />
      {/* <Weather /> */}
      <WeatherWidget location="30d46n91d14/baton-rouge" />
    </div>
  );
}

export default TimeColumn;
