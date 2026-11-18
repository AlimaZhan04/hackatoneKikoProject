import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider,createTheme } from '@mui/material/styles';
const theme=createTheme({palette:{grey:{main:'#757575'}}});
createRoot(document.getElementById('root')).render(<ThemeProvider theme={theme}><BrowserRouter><App /></BrowserRouter></ThemeProvider>);
