import React from 'react';
import { hydrate } from "react-dom";

export default (App) => {
    hydrate(<App />, document.querySelector('#react'));
}