import { useState } from 'react';

const Button = (props) => {
    const { item, handleOnClick } = props;

    return (
        <button
            style={{ fontSize: '2.5rem' }}
            onClick={handleOnClick}
            title={item.title}>
            {item.label}
        </button>
    );
};

const StatisticLine = (props) => {
    const { text, value } = props;

    return (
        <li style={{ lineHeight: '1.4' }}>
            {text}: {value}
        </li>
    );
};

const Statistics = (props) => {
    const { feedback, tot, avr, pos } = props;

    if (tot() === 0)
        return <h2>Help up improve by leaving feedback on our service!</h2>;

    return (
        <div>
            <h2>Feedback statistics:</h2>
            <ul>
                {feedback.map((review, i) => {
                    return (
                        <StatisticLine
                            key={i}
                            text={`${review.title} feedback submissions`}
                            value={review.count}
                        />
                    );
                })}
                <StatisticLine
                    text={'Total number of feedback submissions'}
                    value={tot()}
                />
                <StatisticLine
                    text={'Average score'}
                    value={avr().toFixed(2)}
                />
                <StatisticLine
                    text={'Positive feedback'}
                    value={`${pos().toFixed(2)} %`}
                />
            </ul>
        </div>
    );
};

const App = () => {
    const [feedback, setFeedback] = useState([
        { title: 'Good', count: 0, label: '🙂️' },
        { title: 'Neutral', count: 0, label: '😐️' },
        { title: 'Bad', count: 0, label: '🙁️' },
    ]);

    const handleReview = (idx) => {
        return () => {
            const newValue = [...feedback];
            newValue[idx].count++;
            setFeedback(newValue);
        };
    };

    const totalFeedbackCount = () => {
        return feedback.reduce((acc, f) => (acc += f.count), 0);
    };

    const averageFeedback = () => {
        const total = totalFeedbackCount();
        if (total === 0) return total;
        return (feedback[0].count - feedback[2].count) / total;
    };

    const positiveFeedback = () => {
        const total = totalFeedbackCount();
        if (total === 0) return total;
        return feedback[0].count / total;
    };

    return (
        <div>
            <h1>Give us feedback!</h1>
            <div>
                {feedback.map((item, i) => {
                    return (
                        <Button
                            key={i}
                            item={item}
                            handleOnClick={handleReview(i)}
                        />
                    );
                })}
            </div>
            <Statistics
                feedback={feedback}
                tot={totalFeedbackCount}
                avr={averageFeedback}
                pos={positiveFeedback}
            />
        </div>
    );
};

export default App;
