// import React from 'react';
import './ModuleForm.css';
import React,{ useState } from 'react';

const ModuleForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredModuleId, setModuleId] = useState('');
    const [enteredModuleImage, setModuleImage] = useState('');
    const [enteredModuleDuration, setEnteredModuleDuration] = useState('');


    
    const ModuleIdHandler = (event) => {
        setModuleId(event.target.value);
    }
    const moduleImageHandler = (event) => {
        setModuleImage(event.target.value);
    }

    const moduleDurationHandler = (event) => {
        setEnteredModuleDuration(event.target.value)
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
                    <label>Module Resource ID</label>
                    <input type='text' 
                    placeholder='Module Resource ID'
                    value={enteredModuleId}
                    onChange={ModuleIdHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>Module Resource Name</label>
                    <input type='text' 
                    placeholder='Module Resource Name'
                    value={enteredTitle}
                    onChange={titleChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>Module Resource URL</label>
                    <input 
                    type='text'
                    placeholder='Module Resource URL'
                    value={enteredModuleImage}
                    onChange={moduleImageHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>Module Resource Type</label>
                    <input 
                    type='text'
                    placeholder='Module Resource Type'
                    value={enteredAmount}
                    onChange={amountChangeHandler} />
                </div>
                <div className='new-expense__control'>
                    <label>Module Resource Duration</label>
                    <input 
                    type='time'
                    step='1'
                    value={enteredModuleDuration}
                    onChange={moduleDurationHandler} />
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