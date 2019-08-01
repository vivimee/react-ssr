import React from 'react';
import { render } from "react-dom";

export default (App) => {
    render(<App />, document.querySelector('#react'));
}