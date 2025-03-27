import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ background: "#ffffff", color: "#000" }}>
      <Toolbar>
        <Typography variant="h6">Video Editor</Typography>
      </Toolbar>
    </AppBar>
  );
}
