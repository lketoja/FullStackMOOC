import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) => {
    if(good!==0  || neutral !==0 || bad !==0){
        return(
            <>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={good+neutral+bad} />
            <Statistic text="average" value={(good-bad)/(good+bad)} />
            <Statistic text="positive" value={`${good/(good+neutral+bad)} %`}/>
            </>
        )
    }
    return <p>No feedback given</p>
} 

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)   

    return(
        <>
            <h1>give feedback</h1>
            <Button onClick={()=>setGood(good + 1)} text="good" />
            <Button onClick={()=>setNeutral(neutral + 1)} text="neutral" />
            <Button onClick={()=>setBad(bad + 1)} text="bad"/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
         

        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

