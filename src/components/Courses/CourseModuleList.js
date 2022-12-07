import Dropdown from 'react-bootstrap/Dropdown';
// import { Dropdown } from 'bootstrap';
import Button from '../UI/Button/Button';
import classes from './CourseModuleList.module.css';
import './ColapStyle.css';
import Collapsible from 'react-collapsible';
import ModuleResource from './ModuleResource';
import video from '../video/sample_video.mp4';
import { useEffect, useState } from 'react';

const CourseModuleList = (props) =>{
// const caurseCtx = useContext(CourseContext);
  
//     // const price = `$${props.price.toFixed(2)}`;
  
//     const addToCartHandler = () => {
//       caurseCtx.addItem({
//         id:props.id,
//         name:props.name,
//         image:props.image,
//         description:props.description
//     });
//     };
  
    // const buttonClick =() =>{
    //   <CourseModule/>
    // }

    const [modules, setModules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [searchName, setSearchName] = useState("");
  
      useEffect(() => {
          const fetchModules = async () => {
            let response;
            if(searchName===''){
              response = await fetch(
                'http://localhost:8080/api/modules/'+props.id+'/moduleResources');
            }
            
      
            if (!response.ok) {
              throw new Error('Something went wrong!');
            }
      
            const responseData = await response.json();
      
            const loadedCourses = [];
            const moduleArray = {...responseData._embedded.moduleResource};
      
            // console.log(responseData);
            for (const key in moduleArray) {
              loadedCourses.push({
                id: key,
                moduleId: moduleArray[key].moduleResourceId,
                name: moduleArray[key].moduleResourceName,
                type: moduleArray[key].moduleResourceType,
                url: moduleArray[key].moduleResourceUrl,
              });
            }
            
      
      
            setModules(loadedCourses);
            setIsLoading(false);
          };
      
          fetchModules().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
          });
  
          // const items = modules.map(module => {
          //   <div
          //   name ={module.name},
  
          // })
  
  
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

    const listOfResources = modules.map((module) => (
      <ModuleResource
        videosLink={VideoLink}
        key={module.id}
        id={module.moduleId}
        moduleName={module.name}
        moduleType={module.type}
        resourceUrl={module.url}
      />
    ));


    return (
      <div className={classes.wrap}>
          <Collapsible trigger={props.name} className={classes.collapse}>
            <ul>
              {/* <li>
                <ModuleResource 
                  // onClick={handleVideo}
                  id={props.id}
                />
              </li> */}
              {listOfResources}
            </ul>
          </Collapsible>

      </div> 
    );
}

export default CourseModuleList;