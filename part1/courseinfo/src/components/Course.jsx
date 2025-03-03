const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <>
      <h1>
        {props.name} {props.excercise}
      </h1>
    </>
  );
};

const Content = (props) => {
  const parts = props.parts;
  return parts.map((parts) => (
    <li>
      {parts.name}
      {parts.exercises}
    </li>
  ));
};

const Total = (props) => {
  const parts = props.parts;
  const total = parts.reduce((s, p) => s + p.exercises, 0);
  return (
    <p>
      total of exercises
      {total}
    </p>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

export default Course;
