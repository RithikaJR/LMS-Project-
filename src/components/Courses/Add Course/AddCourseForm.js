import { Input, Label, Textarea,Select} from '@windmill/react-ui';
import React ,{ useEffect, useState } from 'react'
import NewCourse from './Module/NewCourse';
import Modules from './Modules';
import Button from '../../UI/Button/Button.js'
import './AddCourseForm.css';
// import './css/tailwind1.css'


const AddCourseForm = ()=>{

  const [courseCategoryId, setCourseCategoryId] = useState()
  const [courseCategoryName, setCourseCategoryName] = useState("UI")
  const [courseId, setcourseId] = useState('')
  
  const [courseName, setcourseName] = useState()
  const [courseDescription, setcourseDescription] = useState("")
  const [courseImageUrl, setcourseImageUrl] = useState("")

  const [message, setMessage] = useState("");
  // const [cartIsShown, setCartIsShown] = useState(false);
    // const expenses =[
    //     {
    //       // id:'',
    //       "moduleId":0,
    //       "moduleName": "",
    //       "moduleImageUrl":"",
    //       "moduleUrl": ""
    //     },];

      //   const expenses1 =[
      //     {
      //        "moduleId":1,
      //        "moduleName":"Effective Communication",
      //        "moduleImageUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHca7CDuJZnIXEiQ4Fntfirii-OCau_EkusQ&usqp=CAU",
      //        "moduleUrl":"https://www.youtube.com/watch?v=6pYSbdGiDYw"
            
      //     },
      //     {
      //        "moduleId":2,
      //        "moduleName":"Leadership Skills",
      //        "moduleImageUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTql9f7dd3ke97aGuaqXBFANVfjGOGMmAguvw&usqp=CAU",
      //        "moduleUrl":"https://www.youtube.com/watch?v=0sY3uf3LZZg"
            
      //     }
      //  ]

    const[expense, setExpense] =useState([]);

    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {

      const fetchChittyCategory = async () => {
  
        const response = await fetch( 'http://localhost:8080/api/course-category' );
  
        if (!response.ok) {
          throw new Error('Something went wrong!')
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
  
    }, []);

///////////////////////////////
    // useEffect(() => {
      let handleSubmit = async (e) => {
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
      setCourseCategoryId(event.target.value);
      setCourseCategoryName(event.target.name);
      console.log("id "+event.target.value)
      console.log("name "+event.target.name)
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
          <Select className="mt-1 shadow-md" value={courseCategoryId} name={courseCategoryName} onChange={handleCoureseCategory}>
          {category.map(category => (
          <option value={category.categoryId} name={category.categoryId} onChange={handleCoureseCategory}>{category.category_name}</option>))}
          </Select>
      </Label>
        <Label >
          <span> Course Name</span>
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