import { useState } from 'react';

const Button = (props) => {
    const { text, handler, title = '' } = props;

    return (
        <button onClick={handler} title={title}>
            {text}
        </button>
    );
};

const Anecdote = (props) => {
    const { title, anecdote, voteCount } = props;

    if (anecdote === '') {
        return (
            <div style={{ minHeight: '8rem' }}>
                <strong style={{ fontSize: '1.75rem' }}>{title}</strong>
                <br />
                <i>Vote for your favorite anecdotes!</i>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '8rem' }}>
            <strong style={{ fontSize: '1.75rem' }}>{title}</strong>
            <blockquote>
                <q>{anecdote}</q>
            </blockquote>
            <small>
                This anecdote has received {voteCount}{' '}
                {voteCount === 1 ? 'vote' : 'votes'}.
            </small>
        </div>
    );
};

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.',
    ];
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
    const [selected, setSelected] = useState(0);
    const [topAnecdote, setTopAnecdote] = useState({
        text: '',
        voteCount: 0,
    });

    const handleNextClick = () => {
        const idx = Math.floor(Math.random() * anecdotes.length);
        setSelected(idx);
    };

    const handleVoteClick = () => {
        const newValue = [...votes];
        newValue[selected]++;
        setVotes(newValue);

        const maxVoteCount = Math.max(...newValue);
        if (maxVoteCount > topAnecdote.voteCount) {
            const idx = newValue.indexOf(maxVoteCount);
            setTopAnecdote({
                text: anecdotes[idx],
                voteCount: maxVoteCount,
            });
        }
    };

    return (
        <div>
            <Anecdote
                title='Anecdotes for inspiration'
                anecdote={anecdotes[selected]}
                voteCount={votes[selected]}
            />
            <div style={{ marginBlock: '.5rem' }}>
                <Button
                    text='Vote'
                    handler={handleVoteClick}
                    title='Vote for the anecdote if you like it!'
                />
                <Button text='Next Anecdote' handler={handleNextClick} />
            </div>
            <Anecdote
                title='Highest voted anecdote'
                anecdote={topAnecdote.text}
                voteCount={topAnecdote.voteCount}
            />
        </div>
    );
};

export default App;
