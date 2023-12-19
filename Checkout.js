import { useState  , useEffect} from "react"
import axios from "axios"
import { Base_URL } from "../Config/BaseURL"
import {toast} from 'react-toastify'
import  {useNavigate , useLocation} from 'react-router-dom'



function Checkout (){

    const navigate = useNavigate()

    const {state } = useLocation()
    console.log(state)


    var [addressFlag , setAddressFlag] = useState(false)
    var [getAddress , setGetAddress] = useState([])

    var [new_address, setNewAddress] = useState({
        house : "",
        street : "",
        landmark  :"",
        pincode : "",
        alter_mobile  :"",
        primary  : true
    })

    function checkAddress (){
        var id  = localStorage.getItem('auth-id')

        axios.get(Base_URL + '/get-user-addresses' , {params : {u_id  :id}}).then((res)=>{
            console.log(res.data.data)
            setGetAddress(res.data.data)
            toast.success(res.data.message)
            setAddressFlag(false)


        }).catch((err)=>{
            setAddressFlag(true)
            toast.error(err.response.data.message)
        })
    }


    useEffect(()=>{
        checkAddress()

    },[])

    const hanldeInput = (e) =>{
        setNewAddress({...new_address , [e.target.name]  :e.target.value})
    }

    const handleAddNewAddressButton = () =>{

        var data  =  {

            u_id : localStorage.getItem('auth-id'),
            addresses  : [new_address]

        }

        axios.post(Base_URL+'/update-addresses' , data).then((res)=>{
            toast.success(res.data.message)
            checkAddress()
            
        }).catch((err)=>{
            toast.error(err.response.data.message)

        })

    }

    return(

        <>
        {addressFlag == true  ? 
        
        <div style={{  width:'80%' ,  margin:'auto'}}>
        <div class="form-group">
          <label for="exampleFormControlInput1">House No.</label>
          <input type="text" name="house" value={new_address.house} onChange={hanldeInput} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Street.</label>
          <input type="text" name="street" value={new_address.street} onChange={hanldeInput} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Landmark</label>
          <input type="text" name="landmark" value={new_address.landmark} onChange={hanldeInput} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Pincode</label>
          <input type="text" name="pincode" value={new_address.pincode} onChange={hanldeInput} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Alternate Mobile.</label>
          <input type="number" name="alter_mobile" value={new_address.alter_mobile} onChange={hanldeInput} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <button type="submit" class="btn btn-primary mb-2"  onClick={handleAddNewAddressButton} >Add Address</button>

      
      
      </div>
         :<h1>checkout page</h1>}
         </>
    )
}

export default Checkout