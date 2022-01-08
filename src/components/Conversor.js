import React, { Component } from "react"
import "./Conversor.css"

export default class Conversor extends Component {

    constructor(props){
            super(props)

            this.state = {
                moedaA_valor: "", //inserted in the text field
                moedaB_valor: 0, //calculated value
            }

            this.converter = this.converter.bind(this);
    }

    //using the free currenry converter API
    //https://free.currencyconverterapi.com/
    converter(){

        //parameters and URL for the fetch
        let de_para = `${this.props.moedaA}_${this.props.moedaB}`;
        let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=4194356f1ed79f7501f9`

        fetch(url)
        .then(res=>{

            return res.json()

        })
        .then(json=>{
            let cotacao = json[de_para].val
            let moedaB_valor = (parseFloat(this.state.moedaA_valor) * cotacao).toFixed(2)
            this.setState({moedaB_valor})
        })
        
    }

    render(){
        return (
            <div className="conversor">

                <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
                <input className="inputField" type="text" onChange={(event) =>{this.setState({moedaA_valor:event.target.value})}}></input>
                <input className="button" type="button" value="Converter" onClick={this.converter}></input>
                <h2>{this.state.moedaB_valor}</h2>

            </div>
        )
    }
}