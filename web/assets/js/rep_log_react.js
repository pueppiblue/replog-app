import React from 'react';
import {createRoot} from 'react-dom/client';
import RepLogApp from "./RepLogApp/RepLogApp";

const container = document.getElementById('replog-app');
const root = createRoot(container);

console.log(<RepLogApp />);

root.render(<RepLogApp />);
