import React, {useState, useRef} from 'react'
import {storage, auth, db} from '../../firebase'
import { ref } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import {doc, updateDoc} from 'firebase/firestore'

const Setting = () => {
   const [email, setEmail] = useState(localStorage.getItem('email'))
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)
    const [displayName, setDisplayname] = useState(localStorage.getItem('cName'))
    const [imageUrl, setImageUrl] = useState(localStorage.getItem("companyLogo"))
    const [logoBase64, setLogoBase64] = useState('');
    const fileInputeRef = useRef(null)
    const storedLogo = localStorage.getItem('companyLogo');

    const updateCompanyName = () =>{
        updateProfile(auth.currentUser,{
          displayName:displayName
            
        })
        .then(res=>{
           
           localStorage.setItem('cName', displayName)
           updateDoc(doc(db, "users", localStorage.getItem('uid')), {
             displayName : displayName
           })

            .then(res=>{
              window.location.reload()
            })
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
      window.location.reload()
    }

      const updateLogo = ()=>{
      // const fileUrl = ref(storage.localStorage.getItem('companyLogo'))
      //  console.log(fileUrl)
         const storageRef = ref(storage, fileRef._location.path_)
         uploadBytesResumable(storageRef, file)
         
         .then(result=>{
                  window.location.reload()
          })

    }
  return (
    <div>
       <p>Setting</p>
       <div className='setting-wrapper'>
        <div className='profile-info update-cName'>
        <img className='' src={storedLogo} alt="profile pic" onClick={()=>fileInputeRef.current.click()
                  }/>
         <input onChange = {(e)=>{onSelectFile(e)}}  type="file" style={{display:'none'}} ref={fileInputeRef} />
        {file && <button onClick={()=>{updateLogo()}} style={{width:"30%", padding:'10px', backgroundColor:'hotpink'}}>Updae Profile Pic</button>}
        </div>

        <div className='update-cName'>
           <input onChange={e=>{(setDisplayname(e.target.value))}} type="text" placeholder='Company Name' value={displayName}/>
           <button onClick={updateCompanyName}> Update Company Name</button>
           {/* <input type="text" placeholder='Email' value={email}/> */}
        </div>  
       </div>
    </div>
  )
}

export default Setting
