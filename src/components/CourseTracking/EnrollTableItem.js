import classes from './EnrollTableItem.module.css'

const EnrollTableItem = (props) => {

    console.log("coursename"+props.name)

    
    return(
        <li>
            <span className={classes.enroll_items}>
                {props.name}
            </span>
            <span className={classes.enroll_items}>
                {props.duration}
            </span>
        </li>
    )
}

export default EnrollTableItem;