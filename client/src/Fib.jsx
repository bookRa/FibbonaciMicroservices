import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    }

    componentDidMount(){
        this.fetchValues();
        this.fetchIndexes()
    }

    async fetchValues(){
        console.log("fetching all values")
        const values = await axios.get('/api/values/current');
        console.log(`all values so far are ${JSON.stringify(this.state.values)}`)
        this.setState({values:values.data})
    }

    async fetchIndexes(){
        console.log("fetching all indexes")
        const seenIndexes = await axios.get('/api/values/all');
        console.log(`all indexes are ${JSON.stringify(seenIndexes.data)}`)
        this.setState({seenIndexes: seenIndexes.data})
    }

    handleSubmit = async event =>{
        event.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index
        })
        // await this.fetchIndexes()
        // await this.fetchValues()
        this.setState({index:''})
    }

    renderSeenIndexes(){
            
        if(typeof this.state.seenIndexes == Array){

            return this.state.seenIndexes.map(({number})=> number).join(', ')
        }else{
            return []
        }
    }

    renderAllValuesSofar(){
        console.log("rendering all values")
        const entries = []
        if(Object.keys(this.state.values.length).length > 0){

            for (let key of this.state.seenIndexes){
                entries.push(
                    <div key={key}>
                        For index {key} I calculated {this.state.values[key]}
                    </div>
                )
    
            }
        }
        return entries
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="">
                        Enter your index:
                    </label>
                    <input type="text"
                        value={this.state.index}
                        onChange = {event => this.setState({index: event.target.value})}
                    />
                    <button>Submit</button>
                </form>

                <h3>Indexes I've seen</h3>
                {this.renderSeenIndexes()}

                <h3>Calculated Values:</h3>
                {this.renderAllValuesSofar()}
            </div>
        )
    }

}

export default Fib