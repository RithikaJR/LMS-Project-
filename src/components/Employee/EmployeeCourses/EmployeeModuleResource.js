import icon_video from '../../images/icon_video.png';
import icon_pdf from '../../images/icon_pdf.png';
import { useEffect, useState } from 'react';
import classes from './EmployeeModuleResource.module.css';

const EmployeeModuleResource = (props) => {

  const [isVideo, setIsVideo] = useState(false)

  const [checked, setChecked] = useState(true);
  const [state, setState] = useState(true);
  const [checkState, setCheckState] = useState(false);

 
  let arr = props.duration.split(":");
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
          props.resourceCheck(true);
         }, timer);
      }

      console.log(props.moduleType);
      console.log(props.moduleName);
      console.log(props.resourceUrl);
      console.log(props.duration);
    
      // const handleChange = () => {
      //   // setChecked(true);
      //   console.log("trueeee")
      //   props.resourceCheck("dfaf");
      // }
    
    return (
      <li className={classes.resource} >
        <div className={classes.item}>
          <span className={classes.check}>
              <input type="checkbox"
                    // onChange={handleChange}
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

export default EmployeeModuleResource;