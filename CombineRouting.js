import AuthRouting from "./AuthRouting";
import AllRouting from "./AllRouting";





function CombineRouting({countOfCart}){

   //const[auth,setAuth]=useState(false)

return(
   <>
   
   {!localStorage.getItem('auth-id')  ?  <AuthRouting/> : <AllRouting countOfCart = {countOfCart}/> }
      </>


)


}

export default CombineRouting