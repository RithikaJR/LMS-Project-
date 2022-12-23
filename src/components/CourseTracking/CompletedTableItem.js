import classes from './EnrollTableItem.module.css'

const CompleteTableItem = (props) => {

    
    return(
        <li>
            <span className={classes.enroll_items}>
                {props.course_name}
            </span>
        </li>
    )
}

export default CompleteTableItem;
