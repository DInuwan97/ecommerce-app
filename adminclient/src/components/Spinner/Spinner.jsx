import React, { Component, Fragment } from 'react';
import './Spinner.css';

class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingText: "Loading"
        }
    }
    componentDidMount = () => {
        var timer = 0;
        this.interval = setInterval(() => {
            timer++;
            if (timer % 4 == 0) {
                this.setState({
                    loadingText: "Loading"
                })
            } else if (timer % 4 == 1) {
                this.setState({
                    loadingText: "Loading."
                })
            } else if (timer % 4 == 2) {
                this.setState({
                    loadingText: "Loading.."
                })
            } else {
                this.setState({
                    loadingText: "Loading..."
                })
            }
        }, 1500)
    }
    componentWillUnmount=()=>{
        clearInterval(this.interval);
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <div className="loader"></div>
                <h1>{this.state.loadingText}</h1>
            </div>
        );
    }
}

export default Spinner;