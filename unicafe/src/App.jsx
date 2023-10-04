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

const Statistics = (props) => {
    const { feedback, tot, avr, pos } = props;
    
    if (tot() === 0) return <h2>Help up improve by leaving feedback on our service!</h2>;

    return (
        <div>
            <h2>Feedback statistics:</h2>
            <ul>
                {feedback.map((review, i) => {
                    return (
                        <li key={i} style={{ lineHeight: '1.4' }}>
                            {review.title} feedback submissions: {review.count}
                        </li>
                    );
                })}
                <li style={{ lineHeight: '1.4' }}>
                    Total number of feedback submissions: {tot()}
                </li>
                <li style={{ lineHeight: '1.4' }}>
                    Average score: {avr().toFixed(2)}
                </li>
                <li style={{ lineHeight: '1.4' }}>
                    Positive feedback: {pos().toFixed(2)} &#37;
                </li>
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
