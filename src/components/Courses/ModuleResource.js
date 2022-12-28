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

  // const duration = parseInt(props.duration, 10);
  let arr = props.duration.split(":");
// let arr = 08:32:09;
  let pre_timer = arr[0]*3600000 + arr[1]*60000 +arr[2]*1000;
  let timer = (pre_timer * 80)/100;
  console.log(pre_timer)
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
         }, timer);
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