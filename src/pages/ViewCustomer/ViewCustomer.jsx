import React from 'react'
import MiniTable from "../../common/components/table/Table.jsx";
import {useEffect, useState} from "react";
import instance from "../../services/AxiosOrders.jsx";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import AddCustomer from '../../component/addCustomer/AddCustomer.jsx';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import DrawIcon from '@mui/icons-material/Draw';
import Toast from '../../common/components/Alert/Alert.jsx';
import Swal from "sweetalert2";

import axios from 'axios';



function ViewCustomer() {

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateopen, setUpdateopen] = useState(false);
  const [updateData, setUpdateData] = useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const  columns = [
      {id: 'name', label: 'Name',minWidth:170},
      {id: 'contact', label: 'Age',minWidth:100},
      {id: 'salary', label: 'Contact Number', minWidth:170, align:'center'},
      {id: 'address', label: 'Address', minWidth:170, align:'left'},
      {id: 'action', label: 'Action', minWidth:170, align:'center'},

  ];
  const rows = [
      {name:'Raveen',age:24,contact:'0719289613',address:'Walasmulla'},
      {name:'Raveen',age:24,contact:'0719289613',address:'Walasmulla'},
      {name:'Raveen',age:24,contact:'0719289613',address:'Walasmulla'},
      {name:'Raveen',age:24,contact:'0719289613',address:'Walasmulla'}
  ];
  useEffect(()=> {

    loadCustomer();
  },[]);

  const deleteCustomer = (id)=> {

      Swal.fire({
          title: 'Are you sure?',
          text: "You won't Delete customer",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {
            axios.delete('http://127.0.0.1:8000/api/customer/edit/'+id)
                  .then(function (response){
                      Toast.fire({
                          icon: 'success',
                          title: 'Delete customer successfully'
                      })

                  })
                  .catch(function (error){
                      Toast.fire({
                          icon: 'error',
                          title: 'Delete error...'
                      })
                  })
          }
      })




  }

  const updatEvent = (val)=>{
      setUpdateopen(true)
      setUpdateData(val)
      //setData(val)
  }

  const loadCustomer = () =>{

      axios.get('http://127.0.0.1:8000/api/customer')
          .then(function (response){
            console.log(response);
              const customerData = response.data.customer;
              const array = []
              customerData.forEach((val)=>{
                  console.log(val)
                  array.push({
                      name:val.name,
                      contact:val.contact,
                      salary:val.salary,
                      address:val.address,
                      action: (
                          <div>
                              <IconButton color='error' aria-label="delete" onClick={()=> deleteCustomer(val.id)}>
                                  <DeleteIcon />
                              </IconButton>
                              <IconButton color='success' aria-label="delete" onClick={()=> updatEvent(val)}>
                                  <DrawIcon />
                              </IconButton>
                          </div>
                      )

                  })
              })
              setData(array);
          })
          .catch(function (error){
              console.log(error)
          })

  }
  return(
      <div>

            <Box sx={{marginTop:10,fontSize:25,color:'#8EB53E'}}>
             <h3>Customer Details</h3>
            </Box>



          <Box sx={{display: 'flex', justifyContent:'end',marginY:3}}>
              <Button sx={{backgroundColor:'#8EB53E'}} onClick={()=> setOpen(true)} variant="contained">Add Customer</Button>
          </Box>
          <MiniTable rows={data} columns={columns}/>

          <div>
              <AddCustomer open={open} setOpen={(val)=> setOpen(val)} updateData={()=> loadCustomer()}/>
          </div>

          <div>
              <AddCustomer data={updateData} update={true} open={updateopen} setOpen={(val)=> setUpdateopen(val)} updateData={()=> loadCustomer()}/>
          </div>

      </div>
  )
   
}

export default ViewCustomer
