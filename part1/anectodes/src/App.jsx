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

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };
  const mostVotedIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Display text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button
        onClick={() => {
          handleVote();
        }}
        name="vote"
      />
      <Button
        onClick={() => {
          const random = Math.floor(Math.random() * anecdotes.length);
          setSelected(random);
        }}
        name="next anecdote"
      />
      <Display text="Anecdote with most votes" />
      <p>{anecdotes[mostVotedIndex]}</p>
      <p>has {votes[mostVotedIndex]} votes</p>
    </div>
  );
};

export default App;
