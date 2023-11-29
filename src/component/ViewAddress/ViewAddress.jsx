import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Dialog, DialogContent, DialogActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import instance from "../../services/AxiosOrders";

function ViewAddress({ data, open, handleClose }) {
  const [adresses, setAddress] = useState([]);

  function getAddresses() {
    instance
      .get("/customer/address/" + data.id)
      .then(function (response) {
        setAddress(response.data.customer);
      })
      .catch(function (error) {
      });

  }

  useEffect(() => {
  }, []);

  return (
    <Dialog
      sx={{ width: 1000 }}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{
          width: 500,
          backgroundColor: "#8EB53E",
          color: "white",
          fontWeight: 600,
          marginBottom: 5,
        }}
        id="alert-dialog-title"
      >
        {"Addresses"}
      </DialogTitle>
      <DialogContent>
        {adresses.map((val, index) => (
          <>
            <Typography variant="h6" gutterBottom>
              {val.address}
            </Typography>
          </>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ backgroundColor: "#8EB53E", color: "white", borderRadius: 5 }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          sx={{ backgroundColor: "#8EB53E", color: "white", borderRadius: 5 }}
          onClick={() => {
            getAddresses();
          }}
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewAddress;
