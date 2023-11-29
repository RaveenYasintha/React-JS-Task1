import React, { useState } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import instance from "../../services/AxiosOrders";

//link
const preventDefault = (event) => event.preventDefault();

function Register() {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [compassword, setcomPassword] = useState("");
  const onRegister = () => {
    ``;
    console.log(name, email, password, compassword);
    if (name !== "" && email !== "" && password !== "" && compassword !== "") {
      if (password === compassword) {
        const data = {
          name: name,
          email: email,
          password: password,
        };

        instance.post("/register", data).then(function (response) {
          Toast.fire({
            icon: "success",
            title: "register successfully",
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Different Password...",
        });
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "Fill Your Login form...",
      });
    }
  };

  return (
    <Box>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          maxWidth: 800,
          height: 540,
          marginTop: "100px",
          justifyContent: "center",
          marginLeft: "345px",
          borderRadius: 4,
        }}
      >
        <Box>
          <img
            style={{
              width: "400px",
              height: "560px",
              margin: "0",
              padding: "0",
            }}
            src="src\assets\imgThird.avif"
            alt="logo"
          />
        </Box>

        <CardContent sx={{ width: "400px" }}>
          <Box>
            <Box display={"flex"} justifyContent={"center"}>
              <img
                style={{
                  width: "109.63px",
                  height: "109.63px",
                  marginTop: "15px",
                }}
                src="src\assets\imgSeccond.png"
                alt="logo"
              />
            </Box>

            <Box display={"flex"} justifyContent={"center"} marginTop={"5px"}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 600,
                  size: "40px",
                  width: 81,
                  height: 36,
                  lineHeight: "36.31px",
                  color: "#8EB53E",
                  textAlign: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Register
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "flex-end", marginTop: "5px" }}
            >
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                onChange={(val) => setname(val.target.value)}
                id="input1-with-sx"
                label="Name"
                variant="standard"
                fullWidth
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: 1 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                onChange={(val) => setEmail(val.target.value)}
                id="input2-with-sx"
                label="E-Mail"
                variant="standard"
                fullWidth
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: 1 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                onChange={(val) => setPassword(val.target.value)}
                id="input3-with-sx"
                label="Password"
                variant="standard"
                type={"password"}
                fullWidth
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: 1 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                onChange={(val) => setcomPassword(val.target.value)}
                id="input4-with-sx"
                label="Confirm Password"
                variant="standard"
                type={"password"}
                fullWidth
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                marginInlineStart: 4,
                marginTop: "7px",
                typography: "body1",
                "& > :not(style) ~ :not(style)": { ml: 2 },
              }}
              onClick={preventDefault}
            >
              <Link
                href="#"
                underline="none"
                style={{ color: "black", fontSize: "12px" }}
              >
                {"Forgot Password?"}
              </Link>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                marginInlineStart: 4,
                typography: "body1",
                marginBottom: 1.6,
              }}
            >
              <Typography
                onClick={() => {
                  navigate("/login");
                }}
                variant="body2"
                color="text.secondary"
              >
                Login
              </Typography>
            </Box>

            <Divider />

            <CardActions>
              <Button
                onClick={() => onRegister()}
                sx={{ backgroundColor: "#8EB53E" }}
                variant="contained"
                fullWidth
              >
                {" "}
                Register
              </Button>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;
