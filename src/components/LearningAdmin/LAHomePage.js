import UserProfile from '../Employee/UserProfile';
import './LAHome.css'
import Modal from "../UI/Modal/Modal.js";
import Button from '../UI/Button/Button';

const LAHomePage =(props)=>{
  // const [cartIsShown, setCartIsShown] = useState(false);
  // useEffect(() => {
  //   if(props.tracker===1){
  //     setCartIsShown(true);
  //   }else{
  //     setCartIsShown(false);
  //   }
   
  // },[]);


  //   const showCartHandler = () => {
  //     setCartIsShown(true);
  //   };
  
  //   const hideCartHandler = () => {
  //     setCartIsShown(false);
  //   };

    return(
        <div>

        <h1>
            Hello lEARNING learaningAdmin
        </h1>
    {/* <div>
        <Button onClick={showCartHandler}>Change Password</Button>
        {cartIsShown && <Modal onClose={cartIsShown}>
        <UserProfile name={props.name} employeeId={props.employeeId} />
        <Button onClick={hideCartHandler}>Close</Button>
        </Modal>}
    </div> */}

    <div>
      
    </div>
        </div>

    )

}
export default LAHomePage;