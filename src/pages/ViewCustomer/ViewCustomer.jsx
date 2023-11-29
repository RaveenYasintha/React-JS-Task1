import React from "react";
import MiniTable from "../../common/components/table/Table.jsx";
import { useEffect, useState } from "react";
import instance from "../../services/AxiosOrders.jsx";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddCustomer from "../../component/addCustomer/AddCustomer.jsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DrawIcon from "@mui/icons-material/Draw";
import Toast from "../../common/components/Alert/Alert.jsx";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import AddAddress from "../../component/AddAddress/AddAddress.jsx";
import ViewAddress from "../../component/ViewAddress/ViewAddress.jsx";

function ViewCustomer() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateopen, setUpdateopen] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [addressopen, setAddressopen] = useState(false);
  const [addressViewOpen, setAddressViewOpen] = useState(false);
  const [addressData, setAddressData] = useState();


  const columns = [
    { id: "profile", label: "Profile Pic", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "contact", label: "Age", minWidth: 100 },
    { id: "salary", label: "Contact Number", minWidth: 170, align: "center" },
    { id: "address", label: "Address", minWidth: 170, align: "center" },
    { id: "action", label: "Action", minWidth: 170, align: "center" },
  ];

  useEffect(() => {
    loadCustomer();
  }, []);

  const deleteCustomer = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't Delete customer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance
          .delete("/customer/edit/" + id)
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: "Delete customer successfully",
            });
          })
          .catch(function (error) {
            Toast.fire({
              icon: "error",
              title: "Delete error...",
            });
          });
      }
    });
  };

  const updatEvent = (val) => {
    setUpdateopen(true);
    setUpdateData(val);
  };

  const viewAddressevent = (val) => {
    setAddressData(val);
    setAddressViewOpen(true);
  };

  const loadCustomer = () => {
    instance
      .get("/customer")
      .then(function (response) {
        const customerData = response.data.customer;
        const array = [];
        customerData.forEach((val) => {
          console.log(val.image);
          array.push({
            profile: (
              
              <>
                <Avatar
                  alt="Remy Sharp"
                  src={"http://127.0.0.1:8000/" + val.image}
                />
              </>
            ),
            name: val.name,
            contact: val.contact,
            salary: val.salary,
            address: (
              <>
               
                <Button
                  onClick={() => {
                    viewAddressevent(val);
                  }}
                  sx={{
                    backgroundColor: "#8EB53E",
                    fontWeight: 1000,
                    color: "white",
                    marginLeft: 2,
                    width: 100,
                  }}
                >
                  View
                </Button>
              </>
            ),
            action: (
              <div>
                <IconButton
                  color="error"
                  aria-label="delete"
                  onClick={() => deleteCustomer(val.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color="success"
                  aria-label="delete"
                  onClick={() => updatEvent(val)}
                >
                  <DrawIcon />
                </IconButton>
              </div>
            ),
          });
        });
        setData(array);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <Box sx={{ marginTop: 10, fontSize: 25, color: "#8EB53E" }}>
        <h3>Customer Details</h3>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end", marginY: 3 }}>
        <Button
          sx={{
            backgroundColor: "#8EB53E",
            width: 300,
            fontWeight: 800,
            height: 50,
          }}
          onClick={() => setOpen(true)}
          variant="contained"
        >
          Add Customer
        </Button>
      </Box>
      <MiniTable rows={data} columns={columns} />

      <div>
        <AddCustomer
          open={open}
          setOpen={(val) => setOpen(val)}
          updateData={() => loadCustomer()}
        />
      </div>

      <div>
        <AddCustomer
          data={updateData}
          update={true}
          open={updateopen}
          setOpen={(val) => setUpdateopen(val)}
          updateData={() => loadCustomer()}
        />
      </div>
      <div>
        <AddAddress open={addressopen} setOpen={(val) => setAddressopen(val)} />
      </div>

      <div>
        <ViewAddress
          data={addressData}
          open={addressViewOpen}
          handleClose={() => setAddressViewOpen(false)}
        />
      </div>
    </div>
  );
}

export default ViewCustomer;
