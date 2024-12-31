import React from 'react'
import { transformImage } from '../../Lib/Features';
import { FileOpen as FileOpenIcon} from '@mui/icons-material';

const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
        return(<video src={url} preload='none' width={"200px"} controls />)

        case "image":
            return(<img 
                src={transformImage(url, 200)} 
                alt="Attachment" 
                width={"200px"} 
                height={"150px"} 
                style={{
                    object: "contain",
                }}
             />)

        case "audio":
                return (<audio src={url} preload='none' width={"200px"} controls /> ) 
                
  
    default:
        return (<FileOpenIcon />)
  }
}

export default RenderAttachment;