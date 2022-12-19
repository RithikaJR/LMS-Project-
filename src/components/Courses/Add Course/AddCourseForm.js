import { Input, Label, Textarea,Select} from '@windmill/react-ui';
import React ,{ useEffect, useState } from 'react'
import NewCourse from './Module/NewCourse';
import Modules from './Modules';
import Button from '../../UI/Button/Button.js'
import './AddCourseForm.css';
import Axios from 'axios';
import close from '../../images/close.png'


const AddCourseForm = ()=>{

  let token = `Bearer ${sessionStorage.getItem('jwt')}`;

  const [courseCategoryId, setCourseCategoryId] = useState()
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedCourseId, setSelectedCourseId] = useState(100);
  const [selectedModuleId, setSelectedModuleId] = useState(200);
  const [courseCategoryName, setCourseCategoryName] = useState("")
  const [courseId, setcourseId] = useState('')
  const [courseName, setCourseName] = useState();
  
  const [courses, setCourse] = useState([]);
  const [modules, setModules] = useState([]);
  const [resources, setResources] = useState([]);
  const [courseDescription, setcourseDescription] = useState("")
  const [courseImageUrl, setcourseImageUrl] = useState("")
  const [showCourse, setShowCourse] = useState(false);
  const [showModules, setShowModules] = useState(false);
  const [showModuleResources, setShowModuleResources] = useState(false);
  const [addNewCourse, setAddNewCourse] = useState(false);
  const [addNewCategory, setAddNewCategory] = useState(false);
  const [addNewModule, setAddNewModule] = useState(false);

  const [message, setMessage] = useState("");

    const[expense, setExpense] =useState([]);

    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

/////////////////GET COURSE CATEGORY/////////////////
    useEffect(() => {
      const fetchCourseCategory = async () => {
        const response = await fetch(
          'http://localhost:8080/api/course-category',{
            headers:{
              'Authorization':token
            }
          }
        );  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const responseData = await response.json();
        const loadedCategory = [];
        const newItemList = [...responseData._embedded.courseCategory]
        
        for (const key in newItemList) {
          loadedCategory.push({
            id: key,
            categoryId:newItemList[key].categoryId,
            category_name: newItemList[key].categoryName,
          });
        }
        setCategory(loadedCategory);
        setIsLoading(false);
      };
      fetchCourseCategory().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    }, [category,selectedCategoryId]);

//////////////////////////////////////////////////////////////

/////////////////////POST COURSE CATEGORY/////////////////////

const url_category = "http://localhost:8080/api/course-category";
const [categoryData,setCategoryData] = useState({
        categoryName:"",
      });

function handleCategory(e1){
  const newdata = {...categoryData}
  newdata[e1.target.id] = e1.target.value
  setCategoryData(newdata)
  console.log(newdata)
}


function submitCategory(e1){
  e1.preventDefault();
  Axios.post(url_category,{
    categoryName:categoryData.categoryName
  },
  {headers:{
      'Authorization':token
    }})

 

  .then(res=>{
    if(res.data != null){
      alert("Course category added successfully!")
    }
    console.log(res.data)
  })

  setAddNewCategory(false);
}

////////////////////////////// GET COURSE /////////////////////////////
      useEffect(() => {
      // console.log("sssd");
      let fetchCourse = async () => {
        const response = await fetch(
          'http://localhost:8080/api/course-category/'+selectedCategoryId+'/courses',{
            headers:{
              'Authorization':token
            }
          }
        ); 
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const responseData = await response.json();
        const loadedCategory = [];
        const newItemList = [...responseData._embedded.course]
        
        for (const key in newItemList) {
          loadedCategory.push({
            id: key,
            courseId:newItemList[key].courseId,
            course_name:newItemList[key].courseName,
          });
        }
        setCourse(loadedCategory);
        setIsLoading(false);
      };
        fetchCourse().catch((error) => {
          setIsLoading(false);
          setHttpError(error.message);
        });
    
    }, [selectedCategoryId]);

//////////////////////////////////////////////////

//////////////////POST COURSE////////////////////////

const url_course = "http://localhost:8080/api/course-category";
const [courseData,setCourseData] = useState({
        course_name:"",
        course_description:"",
        course_imageUrl:""
      });

function handleCourse(e2){
  const newdata = {...courseData}
  newdata[e2.target.id] = e2.target.value
  setCourseData(newdata)
  console.log(newdata)
}


function submitCourse(e2){
  e2.preventDefault();
  Axios.post(url_course,{
    courseName:courseData.course_name,
    courseDescription:courseData.course_description,
    courseImageURL:courseData.course_imageUrl
  },
  {headers:{
      'Authorization':token
    }})

 

  .then(res=>{
    if(res.data != null){
      alert("Course added successfully!")
    }
    console.log(res.data)
  })

  setAddNewCategory(false);
  setAddNewCourse(false);
}

///////////////////////////////////////////////////////


////////////////////////////// GET MODULE /////////////////////////////
// useEffect(() => {
//   // console.log("dfsdf");
//   let fetchModule = async () => {
//     const response = await fetch(
//       'http://localhost:8080/api/courses/'+selectedCourseId+'/modules',{
//         headers:{
//           'Authorization':token
//         }
//       }
//     ); 
//     if (!response.ok) {
//       throw new Error('Something went wrong!');
//     }
//     const responseData = await response.json();
//     const loadedCategory = [];
//     const newItemList = [...responseData._embedded.module]
    
//     for (const key in newItemList) {
//       loadedCategory.push({
//         id: key,
//         module_id:newItemList[key].moduleId,
//         module_name:newItemList[key].moduleName,
//       })
//     }

//     setModules(loadedCategory);
//     setIsLoading(false);
//   };

//     fetchModule().catch((error) => {
//       setIsLoading(false);
//       setHttpError(error.message);
//     });

// }, [selectedCourseId]);

//////////////////////////////////////////////////////////


/////////////////////// DELETE MODULE ////////////////////

// const deleteModule = async (e) => {
//     e.preventDefault();
//     try {
//       let res = await fetch("http://localhost:8080/api/modules/"+selectedModuleId, {
//         method: "DELETE",
//       //   headers: {"content-type": "application/json"},
//       //   body: JSON.stringify({
//       //     category:{
//       //       categoryId:courseCategoryId,
//       //       categoryName:courseCategoryName,
//       //     },
//       //     course:{
//       //       courseId: courseId,
//       //       courseName: courseName,
//       //       courseDescription: courseDescription,
//       //       courseImageUrl: courseImageUrl,
//       //     },
//       //  }
//       //     ),
//       });
//       let resJson = await res.json();
//       if (res.status === 200) {
//         alert("Successfull!");
//       } else {
//         alert("Some error occured");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };


// if (isLoading) {
//   return (
//     <h1>Loading...</h1>
//   );
// }

// if (httpError) {
//   return (
//     <h1>{httpError}</h1>
//   );
// }
/////////////////////////////////////////////////////////////////////////////


// ////////////////////////////// GET RESOURCES /////////////////////////////
// useEffect(() => {
//   // console.log("dfsdf");
//   let fetchResource = async () => {
//     const response = await fetch(
//       'http://localhost:8080/api/modules/'+selectedModuleId+'/moduleResources'
//     ); 
//     if (!response.ok) {
//       throw new Error('Something went wrong!');
//     }
//     const responseData = await response.json();
//     const loadedCategory = [];
//     const newItemList = [...responseData._embedded.moduleResource]
    
//     for (const key in newItemList) {
//       loadedCategory.push({
//         id: key,
//         resource_id:newItemList[key].moduleResourceId,
//         resource_name:newItemList[key].moduleResourceName,
//         resource_type:newItemList[key].moduleResourceType
//       });
//     }
//     setResources(loadedCategory);
//     setIsLoading(false);
//   };
//     fetchResource().catch((error) => {
//       setIsLoading(false);
//       setHttpError(error.message);
//     });

// }, [selectedModuleId]);

//////////////////////////////////////////////////


///////////////////////////////////////////////////////

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:8080/api/add-module/add", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
              category:{
                categoryId:courseCategoryId,
                categoryName:courseCategoryName,
              },
              course:{
                courseId: courseId,
                courseName: courseName,
                courseDescription: courseDescription,
                courseImageUrl: courseImageUrl,
              },
           }
              ),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            setMessage("User created successfully");
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
      };

  
    if (isLoading) {
      return (
        <h1>Loading...</h1>
      );
    }
  
    if (httpError) {
      return (
        <h1>{httpError}</h1>
      );
    }


    const handleCourseCategory = (event) => {
      // const index = event.target.selectedIndex;
      // const el = event.target.childNodes[index]
      // const option =  el.getAttribute('id');  
      // setCourseCategoryId(option);
      // setCourseCategoryName(event.target.value);
      setSelectedCategoryId(event.target.value);
      setShowCourse(true);
      setAddNewCategory(false);
      setShowModules(false);

      // const option =  event.target.getAttribute('name');  
      // console.log("id "+option)
      console.log("name "+event.target.value)
    }

    const handleCourseSubmit = () => {
      setAddNewCourse(false);
    }

    const handleCategorySubmit = (e) => {
      setAddNewCategory(false);
    }

    const handleCourses = (event) => {
      setSelectedCourseId(event.target.value);
      setShowModules(true);
      setAddNewCourse(false);
      setAddNewCategory(false);
      
    }

    const handleModules = (event) => {
      selectedModuleId(event.target.value);
      setShowModuleResources(true);
      setShowModules(false);
      setAddNewCourse(false);
      setAddNewCategory(false);
    }

    const newCourseCategoryHandler = () => {
      if(addNewCategory === false){
        setAddNewCategory(true);
      }
      else {
        setAddNewCategory(false);
      }
      
    }

    const newCourseHandler = () => {
      if(addNewCourse === false){
        setAddNewCourse(true);
      }
      else {
        setAddNewCourse(false);
      }
    }

    const newModuleHandler = () => {
      if(addNewModule === false){
        setAddNewModule(true);
      }
      else {
        setAddNewModule(false);
      }
    }

    const newModuleResourceHandler = () => {

    }

    const resourceDisplayHandler = (event) => {
      console.log(selectedModuleId);
    }

    const CourseIdHandler = (event) => {
      setcourseId(event.target.value);
    }
  
    const courseNameHandler = (event) => {
      setCourse(event.target.value)
    }
  
    const courseDescriptionHandler = (event) => {
      setcourseDescription(event.target.value)
      console.log(event.target.value)
    }
  
    const courseImageUrlHandler = (event) => {
      setcourseImageUrl(event.target.value)
      
    }
  

  const addExpenseHandler = expenses => {
    console.log('in App');
    setExpense((prevExpense) => {
    return [expenses, ...prevExpense];
     } );
    console.log(expense);
  }


return (
  <>
    <div className='all'>
      <div className="px-4"> 
      <h1>Add Course</h1>

 {/* ////////////////////DISPLAY COURSE CATEGORY/////////////////////// */}
      <div className="individual">
            <label>Course Category</label>
            <select onChange={handleCourseCategory}>
                  <option>Select Course Category</option>
                  {category.map(category => (
                  <option id={category.categoryId} value={category.categoryId} name={category.category_name}>{category.category_name}</option>
                ))}
                
            </select>
            <Button onClick={newCourseCategoryHandler}>Add +</Button>
          </div>
{/* ////////////////////////DISPLAY COURSES//////////////////// */}
      {showCourse &&
      <div className="individual">
            <label>Courses</label>
            <select onChange={handleCourses}>
                  <option>Select Course</option>
                  {courses.map(course => (
                  <option id={course.courseId} value={course.courseId} name={course.course_name}>{course.course_name}</option>
                ))}
                
            </select>
            <Button onClick={newCourseHandler}>Add +</Button>
        </div>}

{/* /////////////////////////DISPLAY MODULES///////////////////////// */}

      {showModules && 

      // <Label className="mt-4 ">
      //   <span>Modules</span>
      //   <select className="mt-1 shadow-md" onChange={handleCourses}>  
      //   {courseName.map(courses => (
      //   <option id={courses.courseId} value={courses.name} name={courses.name}>{courses.name}</option>))}
      //   </select>
      //   <Button onClick={newModuleHandler}>Add +</Button>
      // </Label>
      <div className='module_wrap'>
        <h2>Modules</h2>
        {modules.map(module => (
        <div id={module.module_id} value={module.module_id} name={module.module_name} className="module" onClick={handleModules}>
          <h3>{module.module_name}</h3>
          {/* <Button onClick={deleteModule}><img src={close} /></Button> */}
        </div>))}

        <Button onClick={newModuleHandler}>Add +</Button>
        {addNewModule && 
      
        <div>
          <div className="individual">
              <label>Module Number</label>
              <input type="number"
                    placeholder="Module Number"
                    id='course_description'
                    // onChange={(e2)=>handleCourse(e2)}
                    />
            </div>

            <div className="individual">
              <label>Module Name</label>
              <input type="text"
                    placeholder="Module Name"
                    id='course_imageUrl'
                    // onChange={(e2)=>handleCourse(e2)}
                    />
            </div> 
            <Button onClick={newModuleResourceHandler}>Add +</Button>  
            <NewCourse onAddExpense={addExpenseHandler}/>
          {/* <Modules items={expense} /> */}

          
        </div>}
      </div>
    }

{/* ////////////////////////DISPLAY MODULE RESOURCES/////////////////////////////////// */}

{/* {showModuleResources && 
<div className='resource_wrap'>
  {resources.map(resource => (
  <div id={resource.resource_id} value={resource.resource_id} name={resource.resource_name} className="resource">
    <h4>{resource.resource_name}</h4>
    <h4>Type : {resource.resource_type}</h4>
  </div>))}
</div>
} */}


{/* //////////////////ADD NEW CATEGORIES///////////////////////// */}
      {addNewCategory && 
      
      <div>
        <div className="individual">
            <label>Course Category Name</label>
            <input type="text"
                  placeholder="Course Category"
                  id='categoryName'
                  onChange={(e1)=>handleCategory(e1)}
                  value={categoryData.categoryName} 
                  />
          </div>
        <div className="last">
          <Button type='submit' onClick={(e1)=>submitCategory(e1)}>Submit</Button>
          {/* set to setAddNewCategory(false) in the function; */}
        </div>
    </div>}
{/* ///////////////////////////ADD NEW COURSE/////////////////////// */}
    {addNewCourse && 
      
      <div>
        {/* <Label className="mt-4">
          <span> Course Category ID</span>
          <Input className="mt-4 shadow-md" value={courseId} placeholder="Course Id" onChange={CourseIdHandler} />
        </Label>

        <Label className="mt-4">
          <span> Course Category Name</span>
          <Input className="mt-4 shadow-md" value={courseId} placeholder="Course Id" onChange={CourseIdHandler} />
        </Label> */}

          <div className="individual">
            <label>Course Name</label>
            <input type="text"
                  placeholder="Course"
                  id='course_name'
                  onChange={(e2)=>handleCourse(e2)}
                  // value={data.trainer} 
                  />
          </div>

          <div className="individual">
            <label>Course Description</label>
            <input type="text"
                  placeholder="Course Description"
                  id='course_description'
                  onChange={(e2)=>handleCourse(e2)}
                  // value={data.trainer} 
                  />
          </div>

          <div className="individual">
            <label>Course Image URL</label>
            <input type="text"
                  placeholder="Image URL"
                  id='course_imageUrl'
                  onChange={(e2)=>handleCourse(e2)}
                  // value={data.trainer} 
                  />
          </div>

        <div className="last">
          <Button type='submit' onClick={(e2)=>submitCourse(e2)}>Submit</Button>
          {/* set to setAddNewCourse(false) in the function */}
        </div>
    </div>}

    {addNewModule && 
      
      <div>
        <div className="individual">
            <label>Module Number</label>
            <input type="number"
                  placeholder="Module Number"
                  id='course_description'
                  onChange={(e2)=>handleCourse(e2)}
                  />
          </div>

          <div className="individual">
            <label>Module Name</label>
            <input type="text"
                  placeholder="Module Name"
                  id='course_imageUrl'
                  onChange={(e2)=>handleCourse(e2)}
                  />
          </div>   
          <NewCourse onAddExpense={addExpenseHandler}/>
        {/* <Modules items={expense} /> */}

        
      </div>}

       
        
      </div>
      </div>

      <div className="message">{message ? <p>{message}</p> : null}</div>
      </>
);
}

export default AddCourseForm;