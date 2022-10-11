import React from 'react';
import {createRoot} from 'react-dom/client';

const container = document.getElementById('replog-app');
const root = createRoot(container);
const App = React.createElement(
    'h2',
    {className: "header"},
    "Lift History!",
    React.createElement('span', null, '🎅')
);

const App2 = <h2><span>Lift History 11!</span><span>❤️</span></h2>;

console.log(App2);

root.render(App2);
