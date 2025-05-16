import React, { useState } from 'react'
import {db} from '../../firebase'
import { addDoc, collection,  Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const NewInvoice = () => {
   const [to, setTo] = useState('');
   const[phone, setPhone] = useState('')
   const[address, SetAddress] = useState('')
   const[name, setName] =useState('')
   const[price, setPrice] = useState('')
   const[qty, setQty] = useState(1)
   const[total, setTotal] = useState(0)
    const[isLoading, setLoading]=useState(false)
  //  const[product, setProduct] = useState([
  //    {id:0, name:'laptop', price: 80000, qty:1},
  //    {id:1, name:'phone', price: 8000, qty:2},
  //    {id:2, name:'mouse', price: 800, qty:5}
  //  ])

  const[product, setProduct] = useState([]);

  const navigation = useNavigate()

  const addProduct = ()=>{
    setProduct(
      [...product, 
      {id:product.length,
      'name':name,
      'price':parseFloat(price), 
      'qty':parseInt(qty)}])

       const t = qty * price
      setTotal(total + t)
      setName('');
      setPrice('');
      setQty(1);
  }
  
  const saveData = async() =>{
    setLoading(true)
    console.log(to, phone, address)
    console.log(product)
    console.log(total)

    const data = await addDoc(collection(db, 'invoices'),{
       to:to,
       phone:phone,
       address:address,
       product : product,
       total : total,
       uid : localStorage.getItem('uid'),
       date : Timestamp.fromDate(new Date()) 
    })

     console.log(data)
     navigation('/dashboard/invoices')
     setLoading(false)
  }
  return (
    <div>
      <div className='header-row'>
      <p className='new-invoice-heading'>New Invoice</p>
      <button onClick = {saveData} className ='add-btn' type='button'>{ isLoading && <i class="fas fa-spinner fa-pulse"></i>}Save</button> 
      </div>
      <form action="" className='new-invoice-form'>
        <div className='first-row'>
         <input onChange= {e=>{setTo(e.target.value)}} type="text" placeholder='To' value={to} />
         <input onChange = {e=>{setPhone(e.target.value)}} type="text" placeholder='phone' value = {phone} />
         <input onChange = {e=>{SetAddress(e.target.value)}} type="text" placeholder='Address' value={address} />
        </div>
      
        <div className='first-row'>
         <input onChange={e=>{setName(e.target.value)}} type="text" placeholder='Product name' value={name} />
         <input onChange = {e=>{setPrice(e.target.value)}} type="text" placeholder='Price' value={price} />
         <input onChange = {e=>{setQty(e.target.value)}} type="number" placeholder='Quantity' value={qty} />
        </div>
        <button onClick = {addProduct} className ='add-btn' type='button'>Add Product</button>
      </form>
        
         { product.length > 0 && <div className='product-wrapper'>
         <div className='product-list'>
                <p>Sr. No</p>
                <p>Product Name</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Price</p>
                </div>
            {
              
             product.map((data, index)=>(
               <div className='product-list' key={index}>
                <p>{index + 1}</p>
                <p>{data.name}</p>
                <p>{data.price}</p>
                <p>{data.qty}</p>
                <p>{data.qty * data.price}</p>
                </div>

             ))
          }

          <div className='total-wrapper'>
            <p>Total : {total}</p>
          </div>

         </div>
         }
    </div>
  )
}

export default NewInvoice
