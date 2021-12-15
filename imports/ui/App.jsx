import React, {useState} from 'react';
import {AddressForm} from "./AddressForm";
import {Address} from "./Address";


export const App = () => {

    const [tasks, setTasks] = useState('');

    return (
        <div>
            <h1>Welcome!</h1>

            <AddressForm onUpdateList={setTasks}/>

            {tasks ? (
                <ul>
                    {tasks.map(task => <Address key={task.postalCode} address={task}/>)}
                </ul>
            ) : null}

        </div>
    )
};