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
  const [selectedCourseId, setSelectedCourseId] = useState(8);
  const [selectedModuleId, setSelectedModuleId] = useState(27);
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
  const [selectedResourceType, setSelectedResourceType] = useState("");

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

const url_course = "http://localhost:8080/api/add-course/add";
const [courseData,setCourseData] = useState({
        categoryId:"",
        course_name:"",
        course_description:"",
        course_imageUrl:"",
        course_duration:""
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
    category: {
      categoryId:selectedCategoryId
    },
    course: {
      courseName:courseData.course_name,
      courseDescription:courseData.course_description,
      courseImageURL:courseData.course_imageUrl,
      courseDuration:courseData.course_duration
    }
    
  },
  {headers:{
      'Authorization':token
    }})

 

  .then(res=>{
    if(res.data != null){
      alert("Course added successfully!")
    }
    console.log("hb"+res.data)
  })

  setAddNewCategory(false);
  setAddNewCourse(false);
}

///////////////////////////////////////////////////////


////////////////////////////// GET MODULE /////////////////////////////
useEffect(() => {
  // console.log("dfsdf");
  let fetchModule = async () => {
    const response = await fetch(
      'http://localhost:8080/api/courses/'+selectedCourseId+'/modules',{
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
    const newItemList = [...responseData._embedded.module]
    
    for (const key in newItemList) {
      loadedCategory.push({
        id: key,
        module_id:newItemList[key].moduleId,
        module_name:newItemList[key].moduleName,
      })
    }

    setModules(loadedCategory);
    setIsLoading(false);
  };

    fetchModule().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

}, [selectedCourseId]);

//////////////////////////////////////////////////////////


/////////////////////// ADD MODULE + RESOURCE ////////////////////

const url_module = "http://localhost:8080/api/module/add-module";
const [moduleData,setModuleData] = useState({
        course_id:"",
        module_id:"",
        module_number:"",
        module_name:"",
        resource_name:"",
        resource_type:"",
        resource_url:"",
        resource_duration:"",
      });

function handleModule(e3){
  const newdata = {...moduleData}
  newdata[e3.target.id] = e3.target.value
  setModuleData(newdata)
  console.log(newdata)
}


function submitModule(e3){
  e3.preventDefault();
  Axios.post(url_module,{
      courseId:{
          courseId:selectedCourseId
      },
      module:{
          moduleId:moduleData.module_id,
          moduleSerialNumber:moduleData.module_number,
          moduleName:moduleData.module_name
      },
      moduleResourceItem:[
          {
              moduleResourceName:moduleData.resource_name,
              moduleResourceType:selectedResourceType,
              moduleResourceUrl:moduleData.resource_url,
              moduleResourceDuration:moduleData.resource_duration
          }
      ]
  },
  {headers:{
      'Authorization':token
    }})

 

  .then(res=>{
    if(res.data != null){
      alert("Module & resource added successfully!")
    }
    console.log("hb"+res.data)
    // console.log("iubih"+selectedCourseId);
  })

  setAddNewCategory(false);
  setAddNewCourse(false);
  setAddNewModule(false);
}


/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////

    const handleCourseCategory = (event) => {
      setSelectedCategoryId(event.target.value);
      setShowCourse(true);
      setAddNewCategory(false);
      setShowModules(false);

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

    const handleResourceType = (event) => {
        setSelectedResourceType(event.target.value);
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
      <div className='module_wrap'>
        <h2>Modules</h2>
        {modules.map(module => (
        <div id={module.module_id} value={module.module_id} name={module.module_name} className="module" onClick={handleModules}>
          <h3>{module.module_name}</h3>
        </div>))}
        {!addNewModule &&
          <Button onClick={newModuleHandler}>Add +</Button>
        }
        {addNewModule && 
      
        <div>
          <div className="individual">
              <label>Module ID</label>
              <input type="number"
                    placeholder="Module ID"
                    id='module_id'
                    onChange={(e3)=>handleModule(e3)}
                    />
          </div>
          <div className="individual">
              <label>Module Number</label>
              <input type="number"
                    placeholder="Module Number"
                    id='module_number'
                    onChange={(e3)=>handleModule(e3)}
                    />
            </div>

            <div className="individual">
              <label>Module Name</label>
              <input type="text"
                    placeholder="Module Name"
                    id='module_name'
                    onChange={(e3)=>handleModule(e3)}
                    />
            </div> 
            <div className="individual">
              <label>Resource Name</label>
              <input type="text"
                    placeholder="Module Resource Name"
                    id='resource_name'
                    onChange={(e3)=>handleModule(e3)}
                    />
            </div> 
            <div className="individuals">
              <label>Resource Type</label>
               <select onChange={handleResourceType}>
                  <option>Select Resource Type</option>
                  <option id="resource_type" value="mp4" >Video</option>
                  <option id="resource_type" value="pdf" >Reading Material</option>
            </select>
            </div> 
            <div className="individual">
              <label>Resource URL</label>
              <input type="text"
                    placeholder="Resource URL"
                    id='resource_url'
                    onChange={(e3)=>handleModule(e3)}
                    />
            </div> 
            <div className="individual">
              <label>Resource Duration</label>
              <input type="time"
                    id='resource_duration'
                    step="1"
                    onChange={(e3)=>handleModule(e3)}
                    />
            </div> 
            <div className="last">
              <Button type='submit' onClick={(e3)=>submitModule(e3)}>Submit</Button>
            </div>

          
        </div>}
      </div>
    }




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

        </div>
    </div>}
{/* ///////////////////////////ADD NEW COURSE/////////////////////// */}
    {addNewCourse && 
      
      <div>
        

          <div className="individual">
            <label>Course Name</label>
            <input type="text"
                  placeholder="Course"
                  id='course_name'
                  onChange={(e2)=>handleCourse(e2)}

                  />
          </div>

          <div className="individual">
            <label>Course Description</label>
            <input type="text"
                  placeholder="Course Description"
                  id='course_description'
                  onChange={(e2)=>handleCourse(e2)}

                  />
          </div>

          <div className="individual">
            <label>Course Image URL</label>
            <input type="text"
                  placeholder="Image URL"
                  id='course_imageUrl'
                  onChange={(e2)=>handleCourse(e2)}

                  />
          </div>

          <div className="individual">
            <label>Course Duration</label>
            <input type="time"
                  step="1"
                  id='course_duration'
                  onChange={(e2)=>handleCourse(e2)}
 
                  />
          </div>

        <div className="last">
          <Button type='submit' onClick={(e2)=>submitCourse(e2)}>Submit</Button>

        </div>
    </div>}

       
        
      </div>
      </div>

      <div className="message">{message ? <p>{message}</p> : null}</div>
      </>
);
}

export default AddCourseForm;