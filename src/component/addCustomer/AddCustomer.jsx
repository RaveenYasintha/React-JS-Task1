import React from 'react'
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useEffect, useState} from "react";
import alert from "../../common/components/Alert/Alert.jsx";
import Toast from "../../common/components/Alert/Alert.jsx";
import instance from "../../services/AxiosOrders.jsx";
import axios from 'axios';

function AddCustomer({open, setOpen, update=false,data}) {
    console.log(data);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [salary, setSalary] = useState('');
    const [address, setAddress] = useState('');
    const [id, setId] = useState('');

    useEffect(()=>{
        if (update && data){
            setName(data.name);
            setContact(data.contact);
            setSalary(data.salary);
           setId(data.id);
        }
    },[data])

    const saveEvent = () => {
        if (name.length === 0){
            Toast.fire({
                icon: 'error',
                title: 'Name cannot Be Empty...'
            })
            return
        }

        if (contact.length === 0){
            Toast.fire({
                icon: 'error',
                title: 'Contact cannot Be Empty...'
            })
            return
        }

        var numbers = /^[0-9]+$/;
        if (contact.match(numbers)){
            if (contact.length !== 10){
                Toast.fire({
                    icon: 'error',
                    title: 'invalid number...'
                })
                return
            }
        }else {
            Toast.fire({
                icon: 'error',
                title: 'Numbers only...'
            })
            return
        }

        if (salary.length === 0){
            Toast.fire({
                icon: 'error',
                title: 'Salary cannot Be Empty...'
            })
            return
        }
        console.log(name,contact,salary);

        const data = {
            name: name,
            contact: contact,
            salary: salary,
           // customer_contct: contact
        }

        if (update){
            axios.put('http://127.0.0.1:8000/api/customer/edit/'+id,data)
                .then(function (response){
                    Toast.fire({
                        icon: 'success',
                        title: 'Update customer successfully'
                    })

                })
                .catch(function (error){
                    Toast.fire({
                        icon: 'error',
                        title: 'Saved error...'
                    })
                })

        }else{
            instance.post('http://127.0.0.1:8000/api/customer',data)
                .then(function (response){
                    Toast.fire({
                        icon: 'success',
                        title: 'Save customer successfully'
                    })

                })
                .catch(function (error){
                    Toast.fire({
                        icon: 'error',
                        title: 'Saved error...'
                    })
                })
        }


    }


    return(
        <div>
            <Dialog
                open={open}
                onClose={()=> setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{backgroundColor:'#8EB53E',color:'white', fontWeight:'600',fontSize:25}} id="alert-dialog-title">
                    {update ? "Update customer" : "Add customer"}
                </DialogTitle>
                <DialogContent >
                    <Box>
                        <TextField sx={{marginBottom:2,marginTop:2}}
                            onChange={(val)=> setName(val.target.value)}
                            fullWidth
                            value={name}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined" />
                    </Box>
                    <Box>
                        <TextField sx={{marginBottom:2}}
                            onChange={(val)=> setContact(val.target.value)}
                            fullWidth
                            value={contact}
                            id="outlined-basic"
                            label="Contact"
                            variant="outlined" />
                    </Box>
                    <Box>
                        <TextField sx={{marginBottom:2}}
                            onChange={(val)=> setSalary(val.target.value)}
                            fullWidth
                            value={salary}
                            id="outlined-basic"
                            label="Salary"
                            variant="outlined" />
                    </Box>
                    <Box>
                        <TextField sx={{marginBottom:2}}
                            onChange={(val)=> setAddress(val.target.value)}
                            fullWidth
                            value={address}
                            id="outlined-basic"
                            label="Adderss"
                            variant="outlined" />
                    </Box>
                </DialogContent>
                <DialogActions sx={{marginBottom:1.5}}>
                    <Button sx={{backgroundColor:'#8EB53E', color:'white', borderRadius:5}} onClick={()=> setOpen(false)}>Cancle</Button>
                    <Button sx={{backgroundColor:'#8EB53E', color:'white', borderRadius:5}} onClick={()=> saveEvent()} autoFocus>
                        {update ? "update" : "Save customer"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddCustomer
