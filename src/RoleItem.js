

const RoleItem = (props) => {

    // console.log(props.id);

    return(
        <div className={classes.wrap}>
            <div>Role ID : {props.id}</div>
            <div>Name : {props.name}</div>
        </div>

    );
}

export default RoleItem;