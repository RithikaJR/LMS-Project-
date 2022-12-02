
import Card from "../../UI/Card/Card.js";
// import ExpenseItem from "./Expenseitem";
import './Modules.css';

// import ExpenseFilter from './ExpensesFilter';

import ModuleList from "./ModuleList";


function Modules(props)
{

    const filteredExpenses = props.items.filter((expense) =>
    {
        return expense

    })
    return (
    <Card className="expenses">
        <h2>Modules</h2>
        <ModuleList items={filteredExpenses}></ModuleList>
      
     </Card>
         
       
        
    );
    
}

export default Modules;



 