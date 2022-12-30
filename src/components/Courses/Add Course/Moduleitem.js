import './ModuleItem.css';
import React from 'react';

const ModuleItem = (props) => {
   
    return (
    
        <div className="expense-item">   
   
                       <div className="expense-item__description">
                    <h2>{props.moduleId}</h2>
              <div className="expense-item__description">
                    <h2>{props.moduleName}</h2>
                    <h2>{props.moduleImageUrl}</h2> 
                    <h2>{props.moduleUrl}</h2>
                    </div>
                    </div>

                    
         </div>    
    );
  
}

export default  ModuleItem;