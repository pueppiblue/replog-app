import React from 'react';
import {createRoot} from 'react-dom/client';

const container = document.getElementById('replog-app');
const root = createRoot(container);
const App = React.createElement('h2', {className: "header"}, "Lift History!");

root.render(App);
