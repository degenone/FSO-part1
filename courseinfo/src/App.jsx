const Header = (props) => {
    return (
        <>
            <h1>{props.course.name}</h1>
        </>
    );
};

const Part = (props) => {
    return (
        <>
            <p>
                {props.part.name} &mdash; {props.part.exercises}
            </p>
        </>
    );
};

const Content = (props) => {
    return (
        <div>
            {props.course.parts.map((part, i) => {
                return <Part key={i} part={part} />;
            })}
        </div>
    );
};

const Total = (props) => {
    const total = props.course.parts.reduce(
        (acc, part) => (acc += part.exercises),
        0
    );
    return (
        <>
            <p>Number of exercises {total}</p>
        </>
    );
};

const App = () => {
    const course = {
        name: 'Half stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
            },
            {
                name: 'State of the component',
                exercises: 14,
            },
        ],
    };
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};

export default App;
