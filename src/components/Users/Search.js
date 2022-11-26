import React, { useState, useEffect } from "react";
// import "./App.css";
import axios from "axios";

function Search() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/courses/search/findAllBycourseName?name="+"communication"
      );
      setPosts(response.data);
      setLoading(false);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedCourses = [];

      const courseArray = [...responseData._embedded.course]

      console.log(responseData);
      for (const key in courseArray) {
        loadedCourses.push({
          id: key,
          name: courseArray[key].courseName,
          image: courseArray[key].courseImageUrl,
          courseUrl: courseArray[key].courseUrl,
          description: courseArray[key].courseDescription,
        });
      }

      setPosts(loadedCourses);
      setLoading(false);
    };

    // fetchMeals().catch((error) => {
    //     loadPosts(false);
    //     setHttpError(error.message);
    // });

    loadPosts();
  }, []);

  return (
    <div className="App">
      <h3>Search Filter</h3>
      <input
        style={{ width: "30%", height: "25px" }}
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      {loading ? (
        <h4>Loading ...</h4>
      ) : (
        posts
        //   .filter((value) => {
        //     if (searchTitle === "") {
        //       return value;
        //     } else if (
        //       value.title.toLowerCase().includes(searchTitle.toLowerCase())
        //     ) {
        //       return value;
        //     }
        //   })
          .map((item) => <h5 key={item.id}>{item.title}</h5>)
      )}
    </div>
  );
}

export default Search;

// function Search() {
//     const [fetchAPI, setAPI]=useState([]);
//     const [searchTerm, SetSearchTerm]=useState('');
//     const [searchResult,setSearchResult]=useState([]);
//     useEffect(()=>{
//         axios.post('http://localhost:8080/api/courses/').
//         then((Response)=>{
//              setAPI(Response._embedded.course);
//         },
//         [])
//     })

//     const searchData=(value)=>{
//          SetSearchTerm(value);

//          if(searchTerm!==''){
//             const filteredData = fetchAPI.filter((item)=>{
//                 return Object.values(item).join('').toLowerCase().includes(searchTerm.toLowerCase);
//             })
//             setSearchResult(filteredData);
//          }
//          else{
//             setSearchResult(fetchAPI);
//          }
         
//     }

//     return(
//         <>
//         <div>
//         Searchhh here  <input type="text" onChange={(e)=>searchData(e.target.value)}></input>
//         </div>

//         {
//             searchTerm.length > 1 ? (
//                 <ul>
//                     {searchResult.map(item=>(
//                         <li>{item.course}</li>
//                     ))

//                     }
//                 </ul>
//             ):(
//                 <ul>
//                     {fetchAPI.map(item=>(
//                         <li>{item.name}</li>
//                     ))}
//                 </ul>
//             )
//         }

//         </>
//     );
// }

// export default Search;