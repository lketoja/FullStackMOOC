import React from "react";

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
);

const Header = ({ course }) => <h2>{course.name}</h2>;

const Content = ({ course }) => {
  const kurssinOsat = () =>
    course.parts.map(part => <Part key={part.id} part={part} />);

  return <div>{kurssinOsat()}</div>;
};

const Total = ({ course }) => {
  const sumOfExercises = () =>
    course.parts.reduce((acc, curr) => (acc += curr.exercises), 0);

  return <p>total of {sumOfExercises()} exercises</p>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export default Course;
