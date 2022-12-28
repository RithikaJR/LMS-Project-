
import Card from "../../UI/Card/Card.js";
import './Modules.css';

import ModuleList from "./ModuleList";


const Modules = (props) =>
{

    const filteredExpenses = props.items.filter((expense) =>
    {
        return expense

    })
    return (
    <Card className="expenses">
        <h2>Module Resources</h2>
        <ModuleList items={filteredExpenses}></ModuleList>
      
     </Card>
         
       
        
    );
    
}

export default Modules;



 