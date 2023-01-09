import classes from './EnrollTableItem.module.css'

const EnrollTableItem = (props) => {

    console.log("coursename"+props.name)

    
    return(
        <li className={classes.enroll_list}>
            <div className={classes.enroll_items}>
                {props.name}
            </div>
            <div className={classes.enroll_items}>
                {props.duration}
            </div>
        </li>
    )
}

export default EnrollTableItem;