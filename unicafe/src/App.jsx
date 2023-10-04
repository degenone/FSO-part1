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
//
const App = () => {
    const [reviews, setReviews] = useState([
        { title: 'Good', count: 0, label: '🙂️' },
        { title: 'Neutral', count: 0, label: '😐️' },
        { title: 'Bad', count: 0, label: '🙁️' },
    ]);

    const handleReview = (idx) => {
        return () => {
            const newValue = [...reviews];
            newValue[idx].count++;
            setReviews(newValue);
        };
    };

    return (
        <div>
            <h1>Give us feedback!</h1>
            <div>
                {reviews.map((item, i) => {
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
                {reviews.map((review, i) => {
                    return (
                        <li key={i}>
                            {review.title} {review.count}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default App;
