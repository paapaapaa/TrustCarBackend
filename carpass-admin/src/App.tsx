import "./App.css";
import { AppBar, Box, Button, Modal, Toolbar, Typography } from "@mui/material";
import phone from "./assets/phone.png";
import logo from "./assets/logo.png";
import { Android } from "@mui/icons-material";
import { useState } from "react";
import logo2 from "./assets/logo2.png";

function App() {
  const [open, setOpen] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <video autoPlay loop controls style={{ width: "50%", height: "50%", border: "2px solid grey", backgroundColor: "black" }}>
          <source src="/demo.mp4" type="video/mp4" />
        </video>
      </Modal>
      <Modal open={showContactUs} onClose={() => setShowContactUs(false)} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Box sx={{ width: "60%", height: "60%", backgroundColor: "black", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", padding: "20px 40px", border: "1px solid grey" }}>
          <Typography variant="h2" sx={{ color: "white", marginBottom: "40px", fontSize:{xs:"1.75rem", sm:undefined} }}>
            Contact Us
          </Typography>
          <Typography variant="h4" sx={{ color: "white", fontSize:{xs:"1.125rem"} }}>
            Name: Sami Seppälä
          </Typography>
          <Typography variant="h4" sx={{ color: "white", fontSize:{xs:"1.125rem"} }}>
            Phone: +358 45 6703822
          </Typography>
        </Box>
      </Modal>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          // backgroundImage: `url("${logo}")`,
          // backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
          // backgroundSize: "contain",
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar
          position="static"
          sx={{ backgroundColor: "transparent", width: "100%" }}
        >
          <Toolbar>
            <img src={logo2} alt="logo" style={{ width: "50px", height: "50px" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CarPass
            </Typography>
            <Button color="info" sx={{ marginRight: {xs:"0px", sm:"20px"} }} onClick={() => { setOpen(true) }}>
              Demo
            </Button>
            <Button onClick={() => { setShowContactUs(true) }} color="info">Contact Us</Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Box sx={{
            width: { xs: "90%", sm: "65%" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
            padding: { xs: "5px", sm: "0px 40px" },
          }}>
            <Typography variant="h2" sx={{ color: "white", fontWeight: "100", marginBottom: "40px" }}>
              The Ultimate Car Inspection Solution
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              CarPass is a mobile app that allows you to inspect your car with ease.
            </Typography>
            <Typography variant="body1" sx={{ color: "white", marginBottom: "40px" }}>
              Get the app now and start inspecting your car like a pro.
            </Typography>
            <a href="./carpass.apk" target="_blank" rel="noreferrer">
              <Button color="info" sx={{ backgroundColor: "#222222" }} startIcon={<Android sx={{ color: "greenyellow" }} />}>
                Get Android App
              </Button>
            </a>
          </Box>
          <Box
            sx={{
              width: "35%",
              height: "100%",
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={phone}
              alt="phone"
              style={{
                backgroundImage: `url("${logo}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
