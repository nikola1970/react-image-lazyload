import React, { Component } from "react";
import LazyImage from "./LazyImage";

const imgUrl1 = "https://via.placeholder.com/1920x1000";
const imgUrl2 = "https://via.placeholder.com/1920x500";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="preblock" />
                <LazyImage url={imgUrl1} />
                <LazyImage url={imgUrl2} />
            </div>
        );
    }
}

export default App;
