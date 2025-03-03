import { useState } from "react";

const Display = (props) => {
  return (
    <h1>
      <b>{props.text}</b>
    </h1>
  );
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.name}</button>;
};

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad != 0) {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <StatisticLine text="good" value={props.good} />
            </tr>
            <tr>
              <StatisticLine text="neutral" value={props.neutral} />
            </tr>
            <tr>
              <StatisticLine text="bad" value={props.bad} />
            </tr>

            <tr>
              <StatisticLine
                text="all"
                value={props.good + props.neutral + props.bad}
              />
            </tr>
            <tr>
              <StatisticLine
                text="average"
                value={
                  (props.good * 1 + props.neutral * 0 + props.bad * -1) /
                  (props.good + props.neutral + props.bad)
                }
              />
            </tr>
            <tr>
              <StatisticLine
                text="positive"
                value={
                  (props.good / (props.good + props.neutral + props.bad)) * 100
                }
              />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return <div>No feedback given</div>;
};
const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Display text="give feedback" />
      <Button onClick={() => setGood(good + 1)} name="good" />
      <Button onClick={() => setNeutral(neutral + 1)} name="neutral" />
      <Button onClick={() => setBad(bad + 1)} name="bad" />
      <Display text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
