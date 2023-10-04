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
            <h2>Statistics:</h2>
            <ul>
                {feedback.map((review, i) => {
                    return (
                        <li key={i}>
                            {review.title} {review.count}
                        </li>
                    );
                })}
                <li>Number of feedback submissions: {totalFeedbackCount()}</li>
                <li>Average score: {averageFeedback().toFixed(2)}</li>
                <li>Positive feedback: {positiveFeedback()} &#37;</li>
            </ul>
        </div>
    );
};

export default App;
