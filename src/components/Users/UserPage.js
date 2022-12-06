// import axios from 'axios';
// import React,{Component} from 'react';
import Button from '../UI/Button/Button';
import classes from "./UserPage.module.css";
// import Search from "../Search Bar/Search.js";




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import constants from './constants';
import axios, { AxiosRequestConfig } from 'axios';

const UserPage = () => {
   
    const [selectedFile,setState] = useState(null);

    // On file select (from the pop up)
    const onFileChange = event => {
    // Update the state
        setState(event.target.files[0]);
    };

    // const handleDownload = () => {
    //     let dataBlob = EXCEL_FILE_BASE64;
    //     let sliceSize = 1024;
    //     let byteCharacters = atob(dataBlob);
    //     let bytesLength = byteCharacters.length;
    //     let slicesCount = Math.ceil(bytesLength / sliceSize);
    //     let byteArrays = new Array(slicesCount);
    //     for (let sliceIndex = 0; sliceSize<slicesCount;++sliceIndex) {
    //         let begin = sliceIndex*sliceSize;
    //         let end = Math.min(begin + sliceSize,bytesLength);
    //         let bytes = new Array(end - begin);
    //         for (var offset = begin, i=0;offset<end;++i,++offset){
    //             bytes[i] = byteCharacters[offset].charCodeAt(0);
    //         }
    //         byteArrays[sliceIndex]=new Uint8Array(bytes);
    //     }
    //     let blolb = new Blob(byteArrays, { type: "application/vnd.ms-excel"});
    //     FileSaver.saveAs(new Blob([blob],{}),"my-excel.xlsx");
    // };

     const downloadXLSFile = async () => {
    
        // Its important to set the 'Content-Type': 'blob' and responseType:'arraybuffer'.
        const headers = {'Content-Type': 'blob'};
        const config: AxiosRequestConfig = {method: 'GET', url: "https://experiontechnologies-my.sharepoint.com/:x:/g/personal/drishya_t_experionglobal_com/Ef1HlXZn1qtDumjo2iPG2gABIJPAWydMpFtDDJLyjVeUug?e=GQ6zux", responseType: 'arraybuffer', headers};
        
        try {
            const response = await axios(config);
            
            const outputFilename = `${Date.now()}.xls`;
    
            // If you want to download file automatically using link attribute.
            const url = URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', outputFilename);
            document.body.appendChild(link);
            link.click();
    
            // // OR you can save/write file locally.
            // fs.writeFileSync(outputFilename, response.data);
        } catch (error) {
            throw Error(error);
        }
    }




    const onFileUpload = (e) => {
        e.preventDefault();
        setState(e.target.files);

        const formData = new FormData();
        formData.append('file',selectedFile);
        fetch('http://localhost:8080/api/employee/upload', {method: 'post',body: formData})
        .then(res => {
            if (res.ok) {
                console.log(res.data);
                alert("File uploaded successfully.")
            }
        });
    };

   
    const fileData = () => {
        if (selectedFile) {
            

                return (
                                     <div className={classes.inside_userpage}>
                                         <div>
                                             <h2>File Details:</h2>
                                             <p>File Name: {selectedFile.name}</p>
                    
                                             <p>File Type: {selectedFile.type}</p>
                    
                                             <p>
                                                 Last Modified:{" "}
                                                 {selectedFile.lastModifiedDate.toDateString()}
                                             </p>
                    
                                         </div>
                                     </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h6>Choose before Pressing the Upload button</h6>
                </div>
            );
        }
    };
   
        return (
            

            <div className={classes.userpage}>
                 <div>
                     <h1>
                         Add User List
                     </h1>
                     <h3>
                         Upload Employee Details
                     </h3>
                     <div>
                         <input type="file" onChange={onFileChange} />
                         <Button onClick={onFileUpload}>
                             Upload
                         </Button>

                         

                    <form action="https://experiontechnologies-my.sharepoint.com/:x:/g/personal/drishya_t_experionglobal_com/Ef1HlXZn1qtDumjo2iPG2gABIJPAWydMpFtDDJLyjVeUug?e=GQ6zux">
                            <Button type="submit">
                                Excel Template
                            </Button>
                        </form>
{/* 
                        <Button onClick={downloadXLSFile}>Template</Button> */}
                     </div>
                     {fileData()}
                 </div>
             </div>
        );
    }


export default UserPage;
