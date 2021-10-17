import React from "react";
import SearchHeader from "../../components/SearchHeader";
const {label} = JSON.parse(localStorage.getItem('hudi_rent'))
export default class Houselist extends React.Component{
    
    render(){
        return(
            <div>
                <SearchHeader cityName={label}/>
            </div>
        )
    }
}