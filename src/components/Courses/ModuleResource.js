
import icon_video from '../images/icon_video.png';
import icon_pdf from '../images/icon_pdf.png';
import { useEffect, useState } from 'react';
import classes from './ModuleResource.module.css';
import video from '../video/java.mp4';

const ModuleResource = (props) => {

  const [isVideo, setIsVideo] = useState(false)

  const [checked, setChecked] = useState(true);
  const [state, setState] = useState(true);

  useEffect(() => {
    if(props.moduleType == "mp4") {
      setIsVideo(true);
    }
    else if(props.moduleType == "pdf") {
      setIsVideo(false);
    }

    // setTimeout(() => {
    //   setState(false);
    //  }, 9000);
  });

    const handleAVideo = ()=>{
        props.videosLink(props.resourceUrl);
        setTimeout(() => {
          setState(false);
         }, 9000);
      }

      console.log(props.moduleType);
      console.log(props.moduleName);
      console.log(props.resourceUrl);
    
      const handleChange = () => {
        setChecked(true);
      }
    
    return (
      <li className={classes.resource} >
        <span className={classes.check}>
              {/* <label>Completed?</label> */}
              <input type="checkbox"
                    onChange={handleChange}
                    // {state}
                    disabled={state} />
          </span>
        {/* <div className={classes.resource}> */}
            {isVideo ? <a onClick={handleAVideo}>{props.moduleName}<img src={icon_video} /></a> 
            : 
            <a onClick={handleAVideo}>{props.moduleName}<img src={icon_pdf} /></a>}
                        
        {/* </div> */}
        
      </li>
    );
}

export default ModuleResource;