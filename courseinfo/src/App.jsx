const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
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
            {props.parts.map((part, i) => {
                return <Part key={i} part={part} />
            })}
        </div>
    );
};

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.total}</p>
        </>
    );
};

const App = () => {
    const course = 'Half stack application development';
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    };
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    };
    const part3 = {
        name: 'State of the component',
        exercises: 14
    };
    return (
        <div>
            <Header course={course} />
            <Content
                parts={[part1, part2, part3]}
            />
            <Total total={part1.exercises + part2.exercises + part3.exercises} />
        </div>
    );
};

export default App;
