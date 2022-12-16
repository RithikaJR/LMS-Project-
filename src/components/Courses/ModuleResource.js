import icon_video from '../images/icon_video.png';
import icon_pdf from '../images/icon_pdf.png';
import { useEffect, useState } from 'react';
import classes from './ModuleResource.module.css';
// import video from '../video/java.mp4';

const ModuleResource = (props) => {

  const [isVideo, setIsVideo] = useState(false)

  const [checked, setChecked] = useState(true);
  const [state, setState] = useState(true);
  const [checkState, setCheckState] = useState(false);

  let duration = parseInt(props.duration, 10);
  console.log(props.duration);
  let timer =  duration * 1000;
  console.log(timer);

  useEffect(() => {
    if(props.moduleType == "mp4") {
      setIsVideo(true);
    }
    else if(props.moduleType == "pdf") {
      setIsVideo(false);
    }

  });

    const handleAVideo = ()=>{
        props.videosLink(props.resourceUrl);
        setTimeout(() => {
          setState(false);
          setCheckState(true);
         }, 9000);
      }

      console.log(props.moduleType);
      console.log(props.moduleName);
      console.log(props.resourceUrl);
      console.log(props.duration);
    
      const handleChange = () => {
        setChecked(true);
      }
    
    return (
      <li className={classes.resource} >
        <div className={classes.item}>
          <span className={classes.check}>
              <input type="checkbox"
                    onChange={handleChange}
                    checked={checkState}
                    disabled={state} />
          </span>
        
            {isVideo ? 
            <a onClick={handleAVideo}>{props.moduleName}<img src={icon_video} /></a> 
            : 
            <a onClick={handleAVideo}>{props.moduleName}<img src={icon_pdf} /></a>}
                        
        </div>
        
      </li>
    );
}

export default ModuleResource;