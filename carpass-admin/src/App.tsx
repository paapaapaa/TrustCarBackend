import "./App.css";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Android } from "@mui/icons-material";
import logo from "./assets/logo.png";

function App() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url("${logo}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundColor: "black",
      }}
    >
      <AppBar position="static" sx={{backgroundColor:"transparent"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CarPass
          </Typography>
          <a href="./carpass.apk" target="_blank" rel="noreferrer">
          <Button color="info" sx={{backgroundColor:"#222222"}} startIcon={<Android sx={{color:"greenyellow"}}/>}>
            Get Android App
          </Button>
          </a>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default App;
