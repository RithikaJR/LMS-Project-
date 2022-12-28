import { useEffect, useState } from 'react';
import classes from './ViewList.module.css';
// import BootstrapTable from 'react-bootstrap-table-next';
import DataTable from 'react-data-table-component';
import image from '../images/trashbin.png';


// import classes from './ViewList.module.css';
import ListItem from './ListItem';
import Search from '../Search Bar/Search.js';
import Button from '../UI/Button/Button';
import { handleRef } from '@fluentui/react-component-ref';
import { NavLink } from 'react-router-dom';
import ViewEmployeeData from '../CourseTracking/ViewEmployeeData';
import { FaRegTrashAlt} from 'react-icons/fa';



const ViewList = (props) => {

    let token = `Bearer ${sessionStorage.getItem('jwt')}`;
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
  
    const [searchName, setSearchName] = useState("");
    const [deleteEmployee, setDeleteEmployee] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(1005);
    let columns = [];

    {users.map(user => {
    columns = [
      {
        name: 'Employee ID',
        selector: 'employeeId',
        sortable: true,
      },
      {
        name: 'First Name',
        selector: 'employeeFirstName',
        sortable: true,
      },
      {
        name: 'Last Name',
        selector: 'employeeLastName',
        sortable: true,
      },
      {
        name: 'Email',
        selector: 'employeeEmail',
        sortable: true,    
      },
      {
        name: '',
        cell:({id}) => (
          <NavLink to={{pathname:'/users/report',state:{id:users[id].employeeId,fname:users[id].employeeFirstName, lname:users[id].employeeLastName,email:users[id].employeeEmail}}}><Button className={classes.view}>View</Button></NavLink>  
        ),
      },
      {
        name: '',
        cell:({id}) => (
          <button className={classes.delete}
            value={id}
            onClick={handleEmployeeDelete}
          ><FaRegTrashAlt/></button>
        ),
      },
    ];
    })}
  
    const onSearchHandler = (name)=>{
      console.log(name)
      setSearchName(name);
    }

    useEffect(() => {
      const fetchMeals = async () => {
        let response
        if(searchName === ""){
          response = await fetch(
            'http://localhost:8080/api/employee',{
              headers:{
                'Authorization':token
              }
            }
          );
        }else{
          response = await fetch(
            'http://localhost:8080/api/employee/search/findByemployeeFirstNameContaining?name='+searchName,{
              headers:{
                'Authorization':token
              }
            }
          );
        }
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const responseData = await response.json();
  
        const loadedCourses = [];
        const courseArray = {...responseData._embedded.employees};

        console.log(responseData);
        for (const key in courseArray) {
          loadedCourses.push({
            id: key,
            employeeId:courseArray[key].employeeId,
            employeeFirstName: courseArray[key].employeeFirstName,
            employeeLastName: courseArray[key].employeeLastName,
            employeeEmail: courseArray[key].employeeEmail,
          });
        }

        setUsers(loadedCourses);
        setIsLoading(false);
      };
  
      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
      
    }, []);
  
    if (isLoading) {
      return (
        <section>
          <p>Loading...</p>
        </section>
      );
    }
  
    if (httpError) {
      return (
        <section>
          <p>{httpError}</p>
        </section>
      );
    }

  const handleEmployeeDelete = (event) => {
    // console.log(users[event.target.value].employeeId)
    // console.log(event.target.value);
    // setSelectedEmployeeId(users[event.target.value].employeeId);
    if(window.confirm("Do you want to remove this employee?") == true){
      setDeleteEmployee(true);
      deleteHandler(event);
    }
    else{
      setDeleteEmployee(false);
    }
  }

    const deleteHandler=async (event)=>{
      console.log(users[event.target.value].employeeId);
      try {
          let res=await fetch("http://localhost:8080/api/employee/"+users[event.target.value].employeeId, 
          { 
            method: 'DELETE', 
            headers:{ 'Authorization':token} 
          })

                if (res.status === 204 ) {
                    alert("Employee Deleted!");
                } else {
                    alert("Some error occured");
                    console.log(res.status);
                }
          } 
      catch (err) {
            console.log(err);
          }
  // };
}

    // const reportHandler = () => {
    //   <NavLink to='/reports' />
    // }
  
    const coursesList = users.map((course) => (
      <ViewEmployeeData
        key={course.employeeId}
        id={course.employeeId}
        employeeFirstName={course.employeeFirstName}
        employeeLastName={course.employeeLastName}
        employeeEmail={course.employeeEmail}
      />
    
    ));

  
    return (
      <div className={classes.viewlist}>
        <Search search={onSearchHandler}/>
         
        <div className={classes.tablee}>
          <DataTable 
              title="Employees"
              columns={columns}
              data={users}
              pagination
              highlightOnHover
            />
        </div> 
      </div>
    );
  };

  
  export default ViewList;
  