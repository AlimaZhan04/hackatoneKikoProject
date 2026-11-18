import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../contexts/AuthContextProvider";
import { useNavigate,useLocation } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Your Website</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({palette:{grey:{main:'#757575'}}});

export default function Auth() {
  const {
    email,
    password,
    user,

    errorEmail,
    errorPassword,
    hasAccount,

    setPassword,
    setEmail,
    setHasAccount,

    handleSignUp,
    handleLogIn,
  } = useAuth();

  const navigate = useNavigate();
  const location=useLocation();
  const [busy,setBusy]=React.useState(false),[recoveryInfo,setRecoveryInfo]=React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(busy)return;
    setBusy(true);
    try{if(await (hasAccount?handleLogIn():handleSignUp()))navigate(location.state?.from||'/');}
    finally{setBusy(false);}
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {hasAccount?'Log In':'Register'}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={errorEmail}
              error={!!errorEmail}
              color="grey"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={errorPassword}
              error={!!errorPassword}
              color="grey"
            />

            {hasAccount ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={busy}
              >
                Log In
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={busy}
              >
                Register
              </Button>
            )}

            <Grid container>
              <Grid item xs>
                <Link component="button" type="button" onClick={()=>setRecoveryInfo(value=>!value)} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {hasAccount ? (
                  <Link
                    component="button" type="button"
                    variant="body2"
                    onClick={() => setHasAccount(!hasAccount)}
                  >
                    {"Don't have an account? Register Now"}
                  </Link>
                ) : (
                  <Link
                    component="button" type="button"
                    variant="body2"
                    onClick={() => setHasAccount(!hasAccount)}
                  >
                    {"Already have an account? Log In"}
                  </Link>
                )}
              </Grid>
            </Grid>
            {recoveryInfo&&<Typography role="status" sx={{mt:2,fontSize:13}}>Password recovery by email is not connected in this local demo. Use your saved password or the administrator account from README.</Typography>}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
