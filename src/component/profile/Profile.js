import { View, Text,Image,TouchableOpacity } from 'react-native'
import React, {useState, useContext, useEffect} from 'react';
import { MyContext } from '../context/MyProvider';
import { useNavigation } from '@react-navigation/native';
const Profile = () => {
    const navigation=useNavigation()
    const {profiledata,dob} = useContext(MyContext);
    const p=profiledata.photo;
  return (
    <>
   
    <View style={{flex:1,backgroundColor:'black'}}>
    <TouchableOpacity
          style={{marginBottom: 50, marginLeft: 20, marginTop: 30,backgroundColor:'black',marginTop:50}}
          onPress={async() => {
            navigation.goBack();
            
          }}>
          <Image
            source={require('../../images/back1.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: 'white',
            }}
          />
        </TouchableOpacity>
      {/* <Text style={{fontSize:16,color:'white',marginLeft:200}}>Profile</Text> */}
      <View style={{width:'100%',height:'60%',justifyContent:'center',alignItems:'center'}}>
      <Image
          source={{uri:p}}
          style={{height:100,width:100}}
        />
      <Text style={{fontSize:25,color:'white'}}> Welcome {profiledata.givenName}</Text>
      <Text style={{fontSize:19,color:'white',marginTop:10}}> Email: {profiledata.email}</Text>
      <Text style={{fontSize:19,color:'white',marginTop:10}}> DOB: {JSON.stringify(dob).substring(1,11)}</Text>
      </View>
    </View>
    </>
  )
}

export default Profile