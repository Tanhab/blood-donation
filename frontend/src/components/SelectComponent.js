import React from 'react'
class SelectComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            city:null,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        
        this.setState({
            city: event.target.value
        });
        
    }
    submit(){
        console.warn(this.state)
    }
    render(){
        return(
            <div>
                <div className="row">
                   
                        
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Blood Group:</label>
                                    <select className="form-control" name="city" onChange={this.handleInputChange}>
                                        <option selected>Select Blood Group</option>
                                        <option value="1">O+</option>
                                        <option value="2">O-</option>
                                        <option value="3">A+</option>
                                        <option value="4">A-</option>
                                        <option value="5">B+</option>
                                        <option value="6">B-</option>
                                        <option value="7">AB+</option>
                                        <option value="8">AB-</option>
                                    </select>
                                </div>
                            </div>
                         
                        
                 
                </div>
            </div>
        )  
    }
}
export default SelectComponent;