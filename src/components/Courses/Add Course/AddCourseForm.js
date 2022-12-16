import { Input, Label, Textarea,Select} from '@windmill/react-ui';
import React ,{ useEffect, useState } from 'react'
import NewCourse from './Module/NewCourse';
import Modules from './Modules';
import Button from '../../UI/Button/Button.js'
import './AddCourseForm.css';

const AddCourseForm = ()=>{
  const [courseCategoryId, setCourseCategoryId] = useState(1)
  const [courseCategoryName, setCourseCategoryName] = useState("")

  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const [courses, setcourses] = useState([])
  const [modules, setmodules] = useState([])
  const [courseId, setcourseId] = useState(103)
  const [courseName, setcourseName] = useState()
  const [courseDescription, setcourseDescription] = useState("")
  const [courseImageUrl, setcourseImageUrl] = useState("")

  const [message, setMessage] = useState("");

    const[expense, setExpense] =useState([]);

    useEffect(() => {
      const fetchChittyCategory = async () => {
        const response = await fetch(
          'http://localhost:8080/api/course-category'
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
      fetchChittyCategory().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    },[]);

    ////Course
    useEffect(() => {
    let handleCoureses = async () => {
      const response = await fetch(
        'http://localhost:8080/api/course-category/'+courseCategoryId+'/courses'
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
          courseId: newItemList[key].courseId,
          name: newItemList[key].courseName,
        });
      }
      setcourses(loadedCategory);
      setIsLoading(false);
    };
    handleCoureses().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  },[courseCategoryId]);


      //////Moduless
      useEffect(() => {
      const handleModules = async () => {
        const response = await fetch(
          'http://localhost:8080/api/courses/'+courseId+'/modules'
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
          moduleId: newItemList[key].moduleId,
          name: newItemList[key].moduleName,
          });
        }
        setmodules(loadedCategory);
        setIsLoading(false);
      };
      handleModules().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    },[courseId]);

// ///////////////////////////////
    // useEffect(() => {
      let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:8080/api/add-module/add", {
            method: "POST",
            // dataType: "json",
            // contentType: "application/json; charset=utf-8",
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
              "moduleItem":expense
            }
              
              ),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            // setName("");
            // setEmail("");
            setMessage("User created successfully");
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
      };
    // }, []);

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


    const handleCoureseCategory = (event) => {
      const index = event.target.selectedIndex;
      const el = event.target.childNodes[index]
      const option =  el.getAttribute('id');  
      setCourseCategoryId(option);
      setCourseCategoryName(event.target.value);
      // const option =  event.target.getAttribute('name');  
      console.log("id "+option)
      console.log("name "+event.target.value)
    }

    const handleCourese = (event) => {
      const index = event.target.selectedIndex;
      const el = event.target.childNodes[index]
      const option =  el.getAttribute('id');  
      // setcourseId(option);
      setcourseId(event.target.value);
      setcourseName(event.target.value);

      // const option =  event.target.getAttribute('name');  
      console.log("id "+option)
      console.log("name "+event.target.value)
    }
    const CourseIdHandler = (event) => {
      setcourseId(event.target.value);
    }
  
    const courseNameHandler = (event) => {
      setcourseName(event.target.value)
    }
  
    const courseDescriptionHandler = (event) => {
      setcourseDescription(event.target.value)
      console.log(event.target.value)
    }
  
    const courseImageUrlHandler = (event) => {
      setcourseImageUrl(event.target.value)
      
    }
  
    const onAddCoureHandler = (event) => {
      event.preventDefault();
      console.log(courseCategoryId);
      console.log(courseCategoryName);
      console.log(courseId);
      console.log(courseName);
      console.log(courseDescription);
      console.log(courseImageUrl);
      console.log(expense);
    }
  
    // const moduleHandler = (event) => {
    //   setmoduleHandler(event.target.value)
    // }


  const addExpenseHandler = expenses => {
    console.log('in App');
    setExpense((prevExpense) => {
    return [expenses, ...prevExpense];
     } );
    console.log(expense);
  }

  // const hideCartHandler = () => {
  //   setCartIsShown(false);
  // };


return (
  <>
    <div className='all'>
      {/* <form onSubmit={onAddCoureHandler}> */}
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"> 
      <h1>Add Course</h1>
      <Label className="mt-4 ">
          <span>Course Category</span>
          <select className="mt-1 shadow-md" id={category.categoryId} onChange={handleCoureseCategory}>
          {category.map(category => (
          <option id={category.categoryId} value={category.category_name} name={category.category_name}>{category.category_name}</option>))}
          </select>
      </Label>
      <Label className="mt-4 ">
          <span>Select Course</span>
          <select className="mt-1 shadow-md" id={courses.course} onChange={handleCourese}>
          {courses.map(course => (
          <option id={course.courseId} value={course.courseId} name={course.name}>{course.name}</option>))}
          </select>
      </Label>

      <Label className="mt-4 ">
          <span>Select Module</span>
          <select className="mt-1 shadow-md" >
          {modules.map(module => (
          <option id={module.moduleId} value={module.moduleId} name={module.name}>{module.name}</option>))}
          </select>
      </Label>

        <Label >
          <span> New Course Name</span>
          <Input className="mt-4 shadow-md" value={courseName} placeholder="Course Name" onChange={courseNameHandler}/>
        </Label>

        <Label className="mt-4">
        
        <span> Course Id</span>
        <Input className="mt-4 shadow-md" value={courseId} placeholder="Course Id" onChange={CourseIdHandler} />
        </Label>
        <Label className="mt-4">
          <span>Course Description</span>
          <Textarea className="mt-1 shadow-md" value={courseDescription} rows="3" placeholder="Course Description" onChange={courseDescriptionHandler} />
        </Label>

        <Label className="mt-4">
        
          <span> Course Image Url</span>
          <Input className="mt-4 shadow-md" onChange={courseImageUrlHandler} value={courseImageUrl} placeholder="Course Url" />
        </Label>
      
        <NewCourse onAddExpense={addExpenseHandler}/>
        <Modules items={expense} />
        
        </div>
        <div className="last">
          <Button type='submit' onClick={handleSubmit}>SUBMIT</Button>
          {/* <Button onClick={hideCartHandler}>Cancel</Button> */}
        </div> 
        {/* </form> */}
        
      </div>

      <div className="message">{message ? <p>{message}</p> : null}</div>
      </>
);
}

export default AddCourseForm;