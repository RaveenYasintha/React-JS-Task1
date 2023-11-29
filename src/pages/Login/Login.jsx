import React from "react";
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
import { useState } from "react";
import Toast from "../../common/components/Alert/Alert";
import "../Login/Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const hardcoded = {
    email: "raveen@gmail.com",
    password: "raveen123",
  };

  const loginAction = () => {
    if (email == hardcoded.email && pass == hardcoded.password) {
      console.log("log");
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      localStorage.setItem("login", "loged");
      window.location.reload();
    } else {
      Toast.fire({
        icon: "error",
        title: "Invalid E-Mail Or Password...",
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

            <Box display={"flex"} justifyContent={"center"} marginTop={"4px"}>
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
                Login
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                marginTop: "55px",
              }}
            >
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                onChange={(val) => {
                  setEmail(val.target.value);
                }}
                id="input1-with-sx"
                label="E-Mail"
                variant="standard"
                fullWidth
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                onChange={(val) => {
                  setPass(val.target.value);
                }}
                id="input2-with-sx"
                type={"password"}
                label="Password"
                variant="standard"
                fullWidth
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                marginInlineStart: 4,
                marginTop: "10px",
                typography: "body1",
                "& > :not(style) ~ :not(style)": {
                  ml: 2,
                },
              }}
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
                marginBottom: 3,
              }}
            >
              <Typography
                onClick={() => {
                  navigate("/register");
                }}
                variant="body2"
                color="text.secondary"
              >
                Register ?
              </Typography>
            </Box>
            <Divider />

            <CardActions sx={{ marginTop: "33px" }}>
              <Button
                className="loginButton"
                onClick={() => loginAction()}
                sx={{ backgroundColor: "#8EB53E" }}
                variant="contained"
                fullWidth
              >
                {" "}
                Login
              </Button>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
