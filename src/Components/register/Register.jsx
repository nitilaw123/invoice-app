import React, { useRef, useState } from 'react'
import '../login/login.css'
import { Link, useNavigate } from 'react-router-dom'
import {auth, storage, db} from '../../firebase'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const fileInputeRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const [displayName, setDisplayname] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [logoBase64, setLogoBase64] = useState('');
  const navigate = useNavigate()
  const[isLoading, setLoading]=useState(false)

  const submitHandler=(e)=>{
    e.preventDefault()
    setLoading(true)
    console.log(email,password)
    createUserWithEmailAndPassword(auth, email, password)
    .then(newUser=>{
       console.log(newUser)
      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}`)
      updateProfile(newUser.user, {
        displayName:displayName,
       // photoURL : downloadedUrl
      })

      // setDoc((db, "users", newUser.user.uid),{
      //           uid : newUser.user.uid,
      //           displayName : displayName,
      //           email : email,
      //         //  photoUrl : downloadedUrl
      
      //         })

               setDoc(doc(db, "users", newUser.user.uid), {
                uid: newUser.user.uid,
                displayName: displayName,
                email: email,
                // photoUrl: downloadedUrl
              });

              navigate('/dashboard')
              setLoading(false)
              localStorage.setItem('cName', displayName)
              localStorage.setItem('photoUrl', logoBase64)
              localStorage.setItem('email', newUser.user.email)
              localStorage.setItem('uid', newUser.user.uid)
      // uploadBytesResumable(storageRef)
      // .then(res=>{
      //   console.log("res:"+res)
      //   // getDownloadURL(storageRef)
      //   // .then(downloadedUrl=>{
      //      // console.log("urll"+downloadedUrl)
      //       // updateProfile(newUser.user, {
      //       //   displayName:displayName,
      //       //  // photoURL : downloadedUrl
      //       // })

      //       setDoc((db, "users", newUser.user.uid),{
      //         uid : newUser.user.uid,
      //         displayName : displayName,
      //         email : email,
      //       //  photoUrl : downloadedUrl
    
      //       })


      //   //})
      // })
      
    })
    .catch(err=>{
      setLoading(false)
      console.log(err)
    })
  }

  const onSelectFile = (e)=>{
    // setFile(e.target.files[0])
    //  setImageUrl(URL.createObjectURL(e.target.files[0])) firebase storage code
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      localStorage.setItem('companyLogo', base64String); // ✅ Save to localStorage
      setLogoBase64(base64String);
    };
    reader.readAsDataURL(file)  // local stoarage code for image
  }
  return (
   
        <div className='login-wrapper'>
          <div className='login-container'>
             <div className='login-boxes login-left'></div>
             <div className='login-boxes login-right'>
                <h2 className='login-heading'>Create Your Account</h2>
                <form onSubmit={submitHandler}>
                  <input required onChange={(e)=>{setEmail(e.target.value)}} className='login-input' type="text" placeholder='Email' />
                  <input required onChange= {(e)=>{setDisplayname(e.target.value)}} className='login-input' type="text" placeholder='Company Name' />
                  <input required onChange= {(e)=>{setPassword(e.target.value)}}className='login-input' type="password" placeholder='Password'/>
                  <input required onChange = {(e)=>{onSelectFile(e)}} style={{display:'none'}} className='login-input' type="file" ref={fileInputeRef} />
                  <input required className='login-input' type="button" value='Select your logo' onClick={()=>fileInputeRef.current.click()
                  } />
                  {/* <img className='image-preview' src="{imageUrl}" alt="preview" /> */}
                  {logoBase64 && (
                    <img src={logoBase64}  className='image-preview' alt="Company Logo Preview"  />
               )}
                 <button className='login-input login-btn' type="submit"> {isLoading && <i class="fas fa-spinner fa-pulse"></i>}Submit </button>
                </form>
               
                    {/* <Link to='/register' className='register-link'>
                       Create an account
                  </Link> */}
              
                {/* <p className="register-p">Don't have an account? </p> */}
        
        <Link to="/login" className="register-link">
          Login here
        </Link>

             </div>
            </div>
        </div>
     
  )
}

export default Register
