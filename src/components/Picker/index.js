import React from "react";

import RNPickerSelect from 'react-native-picker-select';

export default function Picker(props){

    const placeholder = {
        label:'Selecione a sua moeda',
        value:null,
        
        
    }

    return(
        <RNPickerSelect 
        
        placeholder={placeholder}
        items={props.moedas} 
        onValueChange={(valor)=>{props.onChange(valor)}}
        style = {{
            inputAndroid:{
                fontSize:15,
                color:"#7a7a75"
            }
        }}
        />
    )
}













