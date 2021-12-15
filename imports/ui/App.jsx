import React, {useState} from 'react';
import {AddressForm} from "./AddressForm";
import {Address} from "./Address";


export const App = () => {

    const [tasks, setTasks] = useState('');

    return (
        <div className="container-fluid">

        <div className="row">
            <div className="col-6 offset-3 pt-4">
                <h1>Welcome!</h1>
            </div>
        </div>

        <div className="row">
            <div className="col-6 offset-3 pt-4">
                <AddressForm onUpdateList={setTasks}/>
            </div>
        </div>


        <div className="row">
            <div className="col-6 offset-3 pt-4">
            {tasks ? (<h3 className="mt-4 mb-4">Results: </h3>): null}
                {tasks ? (
                    <ul className="list-group">
                        {tasks.map(task => <Address key={task.postalCode} address={task}/>)}
                    </ul>
                ) : null}
            </div>
        </div>


        </div>
    )
};