import Button from "../UI/Button/Button";
import classes from './CourseInterface.module.css';


const CourseInterface = (props) => {

    return (
        <div className={classes.wrap}>
            <h1>Modules</h1>
            <a href=""><Button>View Course</Button></a>
        </div>
    )
}

export default CourseInterface;