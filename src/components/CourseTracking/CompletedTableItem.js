import classes from './EnrollTableItem.module.css'

const CompletedTableItem = (props) => {

    console.log("hello"+props.course_name);
    return(
        <li className={classes.enroll_list}>
            <div className={classes.enroll_items}>
                <b>{props.course_name}</b>
            </div>
            <div className={classes.enroll_items}>
                completed on
            </div>
            <div className={classes.enroll_items}>
                {/* <b>{props.final_date}</b> */}
                <b>{props.complete_date}</b>
            </div>
        </li>
    )
}

export default CompletedTableItem;
