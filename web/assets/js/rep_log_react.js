import React from 'react';
import {createRoot} from 'react-dom/client';
import RepLogApp from "./RepLogApp/RepLogApp";

const container = document.getElementById('replog-app');
const root = createRoot(container);

const showHeart = true;


root.render(
    <RepLogApp
        withHeart={showHeart}
    />
);
