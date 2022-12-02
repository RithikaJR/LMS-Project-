import React, { useState } from 'react';
import ModuleForm from './ModuleForm';

import ExpenseForm from './ModuleForm';
import './NewCourse.css'

const NewCourse = (props) => {

    const [isEditing, setIsEditing] = useState(false);
    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            // id:Math.random().toString(),
        };
        props.onAddExpense(expenseData);
        setIsEditing(false);
        };

        const startEditingHandler = () =>{
            setIsEditing(true);
        };

        const stopEditingHandler = () =>{
            setIsEditing(false);
        };

    return(
        <div className='new-expense'>
            {!isEditing && (
                <button onClick={startEditingHandler}>Add Module</button>
            )}
            {isEditing && (
                <ModuleForm onSaveExpenseData={saveExpenseDataHandler}
                onCancel={stopEditingHandler}/>

            )

            }
            
        </div>
    );
};

export default NewCourse;