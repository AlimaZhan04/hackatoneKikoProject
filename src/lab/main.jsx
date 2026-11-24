import React from 'react';
import { createRoot } from 'react-dom/client';
import LabApp from './LabApp.jsx';
import './lab.css';
createRoot(document.getElementById('lab-root')).render(<LabApp/>);
