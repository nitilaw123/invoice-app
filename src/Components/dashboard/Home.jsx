import React, { useState, useEffect, useRef  } from 'react'
import {Chart} from 'chart.js/auto'
import { collection,  doc, getDocs, query, where } from 'firebase/firestore'
import {db} from '../../firebase'

const Home = () => {
  const[total, setTotal] =useState(0)
  const[totalinvoice, setTotalInvoice]=useState(2456)
  const[totalmonthCollection, settotalMonthCollection]=useState(4567)

  const chartRef = useRef(null);          // Ref for the canvas
  const chartInstanceRef = useRef(null);  // Ref for the Chart.js instance
  
  const [invoices, setInvoices] =useState([])
 
    useEffect(() => {
      getData()
      // createChart()
      

      return () => {
        // Cleanup: destroy chart when component unmounts
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
      };
     
    }, [])
    const getData = async ()=>{
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
         getOverAllTotal(data)
         getMonthsTotal(data)
         monthwiseCollection(data)
      }
    
      const getOverAllTotal = (invoiceList) =>{
         var t = 0;
         invoiceList.forEach((data)=>{
            t += data.total;
         })

         setTotal(t)
      }

      const getMonthsTotal = (invoiceList) =>{
        var mt = 0;
        invoiceList.forEach((data)=>{
          if(new Date(data.date.seconds * 1000).getMonth() == new Date().getMonth()){
             console.log(data)
             mt += data.total
          }
        })
        settotalMonthCollection(mt)

     }

     const monthwiseCollection = (data)=>{
      const chartData={
        "Jan":0,
        "Feb":0,
        "Mar":0,
        "Apr":0,
        "May":0,
        "Jun":0,
        "Jul":0,
        "Aug":0,
        "Sep":0,
        "Oct":0,
        "Nov":0,
        "Dec":0
      }

      data.forEach(d=>{
        if(new Date(d.date.seconds * 1000).getFullYear() == new Date().getFullYear())
         {
              // console.log("dd",d)
               chartData[new Date(d.date.seconds * 1000).toLocaleDateString('default',{month:'short'})] += d.total
              // console.log("chartData",chartData)
//console.log("daat",new Date(d.date.seconds * 1000).toLocaleDateString('default',{month:'short'}))
         
           }
        })
  
   //   console.log(Object.keys(createChart))
         // console.log("chartData",chartData)
          createChart(chartData)
     }

  const createChart = (chartData)=>{
    const ctx = document.getElementById("myChart");
    
     // Destroy existing chart if it exists
     if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current =  new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(chartData),
        datasets: [{
          label: 'Monthwise collection',
          data: Object.values(chartData),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  } 

  return (
    <div>
      <div className='home-first-row'>
        <div className='home-box box-1'>
           <h1 className='box-header'>Rs. {total}</h1>
           <p className='box-title'>Overall</p>
        </div>
        <div className='home-box box-2'>
        <h1 className='box-header'> {invoices.length}</h1>
        <p className='box-title'>Invoices</p>
        </div>
        <div className='home-box box-3'>
        <h1 className='box-header'>Rs. {totalmonthCollection}</h1>
        <p className='box-title'>Month Collection</p>
        </div>
      </div>

      <div className='home-second-row'>
        <div className='chart-box'>
           <canvas id="myChart" ref={chartRef}></canvas>
        </div>
        <div className='recent-invoice-list'>
            <h1>Recent Invoice List</h1>
            <div>
              <p>Customer Name</p>
              <p>Date</p>
              <p>Total</p>
            </div>
            {
              invoices.slice(0,6).map(data=>(
                <div>
              <p>{data.to}</p>
              <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
              <p>{data.total}</p>
              </div>

              ))
            }

        </div>
      </div>
    </div>
  )
}

export default Home
