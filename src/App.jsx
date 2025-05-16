import './App.css'
import { BrowserRouter ,  createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/login/Login'
import Register from './Components/register/Register'
import Dashboard from './Components/dashboard/Dashboard';
import Home from './Components/dashboard/Home';
import Invoices from './Components/dashboard/Invoices';
import NewInvoice from './Components/dashboard/NewInvoice';
import Setting from './Components/dashboard/Setting';
import InvoiceDetail from './Components/dashboard/InvoiceDetail';

function App() {
  
     const myRouter = createBrowserRouter([
        {path:'', Component:Login},
        {path:'/login', Component:Login},
        {path:'/register', Component:Register},
        {path:'/dashboard', Component:Dashboard, children:[
         {path:"", Component:Home},
          {path:"home", Component:Home},
          {path:"invoices", Component:Invoices},
          {path:'new-invoice', Component:NewInvoice},
          {path:'invoice-detail', Component:InvoiceDetail},
          {path:'setting', Component:Setting}
        ]}    
       
     ])
  return (
   <div>
      <RouterProvider router={myRouter}></RouterProvider>
      
   </div>
  
 
  );
}

export default App

