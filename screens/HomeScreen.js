import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal,ScrollView,KeyboardAvoidingView,FlatList} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            allExchanges:[],
        };
    }

    componentDidMount=async()=>{
        const data=await db.collection('Exchanges').get();

        data.docs.map((doc)=>{
          this.setState({allExchanges:[...this.state.allExchanges,doc.data()]})
        })
    }

    render(){
        return(
            <View>
    <FlatList  data={this.state.allExchanges}
         renderItem={({item,i})=>(
            <View style={{backgroundColor:'red',borderWidth:2,marginTop:10,width:800,alignSelf:'center',alignItems:'center'}}>
                  <Text>{"Book Name:"+item.itemname}</Text>
                  <Text>{"Book Description:"+item.itemdescription} </Text>
             </View>
         )} keyExtractor={(item,index)=>{
           index.toString();
         }} 
         //onEndReached={this.loadMore()}
         onEndReachedThreshold={0.6}/>
            </View>
        )
    }
}