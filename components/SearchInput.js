import React, {Component} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

export default class SearchInput extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    handleChangeText = (text) => {
        this.setState({text: text});
    };

    handleSubmitEditing = () =>{
        const {onSubmit} = this.props;
        const {text} = this.state;

        if(!text) return;

        onSubmit(text);
        this.setState({
            text: '',
        })
    }

    render(){
        const {text} = this.state;
        const {placeholder} = this.props;
        return(
            <TextInput 
            style = {styles.inputText} 
            placeholder = {placeholder}
            value = {text}
            onSubmitEditing = {this.handleSubmitEditing}
            onChangeText = {this.handleChangeText}
            placeholderTextColor = 'white'
            />
        );
    }
}

const styles = StyleSheet.create({
    inputText:{
        backgroundColor: 'gray',
        width: 300,
        height: 40,
        marginTop: 20,
        color: "white",
    }
  });