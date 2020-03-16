import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = ({anecdotes}) => {
    
    const [position, setPosition] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
    const [mostVotesIndex, setMostVotesIndex] = useState(0)

    const drawNext = () => 
        setPosition(Math.floor(Math.random()*anecdotes.length))

    const updateVotes = () => {
        const copy = [...votes]
        copy[position] += 1
        setVotes(copy)
        if(votes[position]> votes[mostVotesIndex]){
            setMostVotesIndex(position)
        }
        //setMostVotesIndex(votes.indexOf(Math.max(...votes)))
    }

    return(
        <>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[position]}</p>
        <button onClick={updateVotes}>vote</button>
        <button onClick={drawNext}>next anecdote</button>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[mostVotesIndex]}</p>
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));

