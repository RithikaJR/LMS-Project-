
import icon_video from '../images/icon_video.png';
import icon_pdf from '../images/icon_pdf.png';
import { useState } from 'react';
import classes from './ModuleResource.module.css';

const ModuleResource = (props) => {

    const [isVideo, setIsVideo] = useState(false)

    const handleVideo = ()=>{
        props.videoLink("#");
      }

    const typeOfModule = () => {
        if(props.moduleType == ".mp4") {
            setIsVideo(true);
        }
        else if(props.moduleType == ".pdf") {
            setIsVideo(false);
        }
    }
    

    
    return (
        <div className={classes.resource}>
            {isVideo ? <a onClick={handleVideo}>{props.name}<img src={icon_video} /></a> 
            : 
            <a onClick={handleVideo}>{props.name}<img src={icon_pdf} /></a>}
                        
        </div>
    );
}

export default ModuleResource;