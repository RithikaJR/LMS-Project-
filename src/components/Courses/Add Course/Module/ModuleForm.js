// import React from 'react';
import './ModuleForm.css';
import React,{ useState } from 'react';

const ModuleForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredModuleId, setModuleId] = useState('');
    const [enteredModuleImage, setModuleImage] = useState('');


    
    const ModuleIdHandler = (event) => {
        setModuleId(event.target.value);
    }
    const moduelImageHandler = (event) => {
        setModuleImage(event.target.value);
    }

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }
    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    }
    
    const submitHandler = (event) => {
        event.preventDefault();
        
        const expensesData = {
            moduleId:enteredModuleId,
            moduleName: enteredTitle,
            moduleImageUrl:enteredModuleImage,
            moduleUrl: enteredAmount
        };
        props.onSaveExpenseData(expensesData);
        setModuleId('');
        setModuleImage('');
        setEnteredTitle('');
        setEnteredAmount('');

    };
    return(
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
            <div className='new-expense__control'>
                    <label>Module Resource Id</label>
                    <input type='text' 
                    value={enteredModuleId}
                    onChange={ModuleIdHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>Module Resource Name</label>
                    <input type='text' 
                    value={enteredTitle}
                    onChange={titleChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>Resource URL</label>
                    <input 
                    type='text'
                    value={enteredModuleImage}
                    onChange={moduelImageHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>Resource Type</label>
                    <input 
                    type='text'
                    value={enteredAmount}
                    onChange={amountChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>Resource Duration</label>
                    <input 
                    type='time'
                    step='00:00:01'
                    value={enteredModuleImage}
                    onChange={moduelImageHandler} />
                </div>

                <div className='new-expense__actions'>

                    <button type='submit'>Add Module</button>
                    <button type='button' onClick={props.onCancel}>Cancel</button>
                </div>
                
            </div>
        </form>
    );
};

export default ModuleForm;