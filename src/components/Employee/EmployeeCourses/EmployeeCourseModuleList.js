import DropdownButton from 'react-bootstrap/DropdownButton';
import classes from './EmployeeCourseModuleList.module.css';
import './ColapStyle.css';
import video from '../../video/sample_video.mp4';
import { useEffect, useState } from 'react';
import EmployeeModuleResource from './EmployeeModuleResource';


const EmployeeCourseModuleList = (props) =>{

  const [moduleResource, setModuleResource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchModules = async () => {
          let response = await fetch(
              'http://localhost:8080/api/modules/'+props.id+'/moduleResources');
              
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

      }, []);
    

  const handleVideo = ()=>{
    props.videoLink(video);
  }


  console.log(props.id);
  console.log(props.name);
  console.log(props.moduleId);


  const VideoLink = (link)=>{
    props.videooLink(link);
  }

  const listOfResources = moduleResource.map((module) => (
    <EmployeeModuleResource
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
          <DropdownButton id="dropdown-basic-button" title={props.name}>
            {listOfResources}
          </DropdownButton>
      </div> 
    );
}

export default EmployeeCourseModuleList;