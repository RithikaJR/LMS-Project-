import DropdownButton from 'react-bootstrap/DropdownButton';
import classes from './EmployeeCourseModuleList.module.css';
import './ColapStyle.css';
import video from '../../video/sample_video.mp4';
import { useEffect, useState } from 'react';
import EmployeeModuleResource from './EmployeeModuleResource';


const EmployeeCourseModuleList = (props) =>{

  let token = `Bearer ${sessionStorage.getItem('jwt')}`;
  
  const [moduleResource, setModuleResource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [moduleCheck, setModuleCheck] = useState(false);  

    useEffect(() => {
        const fetchModules = async () => {
          let response = await fetch(
              'http://localhost:8080/api/modules/'+props.id+'/moduleResources',{
                headers:{
                  'Authorization':token
                }
              });
              
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
    
          const responseData = await response.json();
    
          const loadedCourses = [];
          const moduleArray = {...responseData._embedded.moduleResource};
    
          for (const key in moduleArray) {
            loadedCourses.push({
              id: key,
              moduleId: moduleArray[key].moduleResourceId,
              name: moduleArray[key].moduleResourceName,
              type: moduleArray[key].moduleResourceType,
              url: moduleArray[key].moduleResourceUrl,
              duration: moduleArray[key].moduleResourceDuration,
            });
          }
          
          setModuleResource(loadedCourses);
          setIsLoading(false);
        };
    
        fetchModules().catch((error) => {
          setIsLoading(false);
          setHttpError(error.message);
        });
       
        // for(i; i<moduleResource.length; i++){

        // }
        if(moduleCheck===true){
          checkedHandler();
        } 
        

      }, [moduleCheck]);
    

  // const handleChecks = ()=>{
  //   if(props.checked == true){
  //     setModuleCheck(true)
  //   }
  //   else{
  //     setModuleCheck(false);
  //   }
  // }

  const checkedHandler = () =>{
    console.log("hjfsjafjfj")
    props.moduleCheck(true)
  }


  console.log(props.id);
  console.log(props.name);
  // console.log(props.moduleId);


  const VideoLink = (link)=>{
    props.videooLink(link);
  }

  const resourceCheck=(value)=>{
    console.log("aa"+value)
    if(value === true){
      setModuleCheck(true)
      return true
    }
    else{
      setModuleCheck(false);
      return false
    }
  }

  const listOfResources = moduleResource.map((module) => (
    <EmployeeModuleResource
      resourceCheck={resourceCheck}
      videosLink={VideoLink}
      key={module.id}
      id={module.moduleId}
      moduleName={module.name}
      moduleType={module.type}
      resourceUrl={module.url}
      duration={module.duration}
    />
  ));

    return (
      <div className={classes.wrap}>
        <div className={classes.check}>
          {/* <form> */}
            <input type="checkbox" 
                   onChange={checkedHandler}
                   checked={moduleCheck}/>
          {/* </form> */}
        </div>
          <DropdownButton id="dropdown-basic-button" title={props.name}>
            {listOfResources}
          </DropdownButton>
      </div> 
    );
}

export default EmployeeCourseModuleList;