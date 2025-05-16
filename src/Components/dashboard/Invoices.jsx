import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {db} from '../../firebase'
const Invoices = () => {
  useEffect(() => {
    getData()
  
  
  }, [])

    const [invoices, setInvoices] = useState([])
    const navigate = useNavigate()
    const[isLoading, setLoading]=useState(false)
  
    const getData = async ()=>{
      setLoading(true)
      const q = query(collection(db, "invoices"),where ('uid', '==', localStorage.getItem('uid') ))
     const querySnapShot = await getDocs(q)
    //  querySnapShot.forEach(doc => {
    //     console.log(doc.id, "=>", doc.data())
    //  });
       const data = querySnapShot.docs.map(doc => ({
        id : doc.id,
        ...doc.data()
       }
        
       ))
    // console.log(querySnapShot.docs)
      setInvoices(data)
     // console.log(data)
      setLoading(false)
   
  }
  const deleteInvoice = async(id) =>{
    //  console.log(id)
    const isSure = (window.confirm('Are you sure want to delete?'))
    if(isSure){
       try{
          await deleteDoc(doc(db, 'invoices',id))
          getData()
       }
       catch{
         window.alert("Something is wrong")
       }
    }
  }
  return (
    <div>
     {
       isLoading ? <div style={{display:'flex', height:'100vh', justifyContent:'center',alignItems:'center'}}>
        <i style={{fontSize:'30'}} class="fas fa-spinner fa-pulse"></i></div> :
        <div>
          {
       invoices.map(data=>(
        <div className='box' key = {data.id}>
           <p>{data.to}</p>
           <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
           <p>Rs.{data.total}</p>
           <button onClick = {()=>deleteInvoice(data.id)} className='delete-btn'><i className="fa-solid fa-trash"></i> </button>
           <button onClick={()=>{navigate('/dashboard/invoice-detail', {state : data})}}  className='delete-btn view-btn'><i class="fa-solid fa-eye"></i> View</button>
        </div>
       ))
      }
      {
          invoices.length < 1 && <div className='no-invoice-wrapper'>
            <p>You have no invoice till now </p>
            <button onClick={()=>{navigate('/dashboard/new-invoice')}}>Create new invoice</button>
          </div>
           
      }
      
       </div>
     }
    </div>
  )
}

export default Invoices
