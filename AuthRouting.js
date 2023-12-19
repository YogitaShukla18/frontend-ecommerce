import {Routes , Route , Link} from 'react-router-dom';
import Login from '../Screens/Login';
import Register from '../Screens/Register';


const AuthRouting  =  ()=>{

    return(

            <>
        <Routes>
            <Route path='/'  element={<Login/>}  />
            <Route path='/login'  element={<Login/>}  />
            <Route path='/register'  element={<Register/>}  />
            <Route path='*'  element={<Login/>}  />
            



            </Routes>
        </>


    )


}

export default AuthRouting