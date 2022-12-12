import { useEffect, useState } from 'react';
import classes from './ViewList.module.css';
// import BootstrapTable from 'react-bootstrap-table-next';
import DataTable from 'react-data-table-component';

// import classes from './ViewList.module.css';
import ListItem from './ListItem';
import Search from '../Search Bar/Search.js';

const columns = [
  {
    name: 'First Name',
    selector: 'employeeFirstName',
    sortable: true,
    // style: {
    //   background: "orange",
    // },
  },
  {
    name: 'Last Name',
    selector: 'employeeLastName',
    sortable: true,
  },
  {
    name: 'Email ids',
    selector: 'employeeEmail',
    sortable: true,    
  },
  {
    name: 'Role',
    // selector: 'Trainee',
    cell:(row) => (
      <input
        // value={row.surname}
        // value="Trainee"
        // onChange={(e) => handleInputChange(row, "surname", e)}
      />
    ),
  },

  {
    name: 'Edit',
    // selector: 'Trainee',
    cell:(row) => (
      <button
        // value={row.surname}
        // onClick={(e) => handleInputChange(row, "surname", e)}
      >🖋</button>
    ),
  },

  {
    name: 'Delete',
    // selector: 'Trainee',
    cell:(row) => (
      <button
        // value={row.surname}
        // onClick={(e) => handleInputChange()}
      >🗑</button>
    ),
  },

  
];

const ViewList = () => {
    const [courses, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
  
    const [searchName, setSearchName] = useState("");
  
    const onSearchHandler = (name)=>{
      console.log(name)
      setSearchName(name);
    }

    useEffect(() => {
      const fetchMeals = async () => {
        let response
        if(searchName ===""){
          response = await fetch(
            'http://localhost:8080/api/employee'
          );
        }else{
          response = await fetch(
            'http://localhost:8080/api/employee/search/findByemployeeFirstNameContaining?name='+searchName
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
            employeeFirstName: courseArray[key].employeeFirstName,
            employeeLastName: courseArray[key].employeeLastName,
            employeeEmail: courseArray[key].employeeEmail,
            // description: courseArray[key].courseDescription,
          });
        }
  
        setMeals(loadedCourses);
        setIsLoading(false);
      };
  
      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    }, [searchName]);
  
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
  
    const coursesList = courses.map((course) => (
      <ListItem
        key={course.employeeId}
        id={course.employeeId}
        employeeFirstName={course.employeeFirstName}
        employeeLastName={course.employeeLastName}
        employeeEmail={course.employeeEmail}
        // description={course.description}
      />
    ));

  
    return (
      <div className={classes.viewlist}>
        <Search search={onSearchHandler}/>
         
        <div className={classes.tablee}>
          <DataTable 
              title="Employees"
              columns={columns}
              data={courses}
              pagination
              highlightOnHover
            />
        </div>

        {/* <table className={classes.tablee}>
          <thead>
            <tr>
              <th className={classes.first_head}>Name</th>
             
              <th>Email</th>
              <th className={classes.last_head}>Role</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(item => {
              return (
                <tr key={item.employeeId}>
                  <td className={classes.first_column}>{ item.employeeFirstName }  { item.employeeLastName }</td>
                  <td>{item.employeeEmail}</td>
                  <td className={classes.last_column}>Trainee</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
        
      </div>
    );
  };

  
  export default ViewList;
  