import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import alert from "../../common/components/Alert/Alert.jsx";
import Toast from "../../common/components/Alert/Alert.jsx";
import instance from "../../services/AxiosOrders.jsx";

function AddAddress({ open, setOpen, save = false, data }) {

  const [address, setAddress] = useState();

  useEffect(() => {
    if (save && data) {
      setName(data.address);
      setId(data.id);
    }
  }, [data]);

  const saveEvent = () => {
    if (address.length === 0) {
      Toast.fire({
        icon: "error",
        title: "Address cannot Be Empty...",
      });
      return;
    }

    const data = {
      address: address,
    };

    instance
      .post("/customer/address", data)
      .then(function (response) {
        updateData();
        setOpen(false);
        Toast.fire({
          icon: "success",
          title: "Save customer address successfully",
        });
      })
      .catch(function (error) {
        Toast.fire({
          icon: "error",
          title: "Saved error...",
        });
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{
            backgroundColor: "#8EB53E",
            color: "white",
            fontWeight: "600",
            fontSize: 25,
          }}
          id="alert-dialog-title"
        >
          Add Address
        </DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              sx={{ marginBottom: 2, marginTop: 4, width: 400 }}
              onChange={(val) => setAddress(val.target.value)}
              fullWidth
              value={address}
              id="outlined-basic"
              label="Adderss"
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ marginBottom: 1.5 }}>
          <Button
            sx={{ backgroundColor: "#8EB53E", color: "white", borderRadius: 5 }}
            onClick={() => setOpen(false)}
          >
            Cancle
          </Button>
          <Button
            sx={{ backgroundColor: "#8EB53E", color: "white", borderRadius: 5 }}
            onClick={() => saveEvent()}
            autoFocus
          >
            Save Address
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddAddress;
