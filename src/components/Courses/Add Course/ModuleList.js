import ExpenseItem from "./Moduleitem"
import Card from "../../UI/Card/Card.js";
import './ModuleList.css'
import ModuleItem from "./Moduleitem";

function ModuleList(props)
{    
    if(props.items.length === 0)
    {
        return<h1 className="expenses-list__fallback">No Items Found</h1>
    }
    return(
        <Card>
        {props.items.map((expense) =>
            (
             <ModuleItem
             key = {expense.id}
             moduleId = {expense.moduleId}
             moduleName = {expense.moduleName}
             moduleImageUrl = {expense.moduleImageUrl}
             moduleUrl= {expense.moduleUrl}
            /> ))}
            </Card>
    )

}
export default ModuleList;
