import React,{Fragment} from 'react'
import spinner from "./spinner.gif";

export default function Spinner() {
    return (
        <Fragment>
        <img
          src={spinner}
          style={{ width: "1000px",height:"400px", margin: "auto", display: "block" ,paddingRight: "150px"}}
          alt="Loading..."
        />
      </Fragment>
      
    )
}


