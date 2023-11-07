
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React, {createContext, useState,useContext} from 'react';
import IMAGES from '../../../Assets';
import {useNavigation} from '@react-navigation/native';
import { MyContext } from '../../context/MyProvider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { googlesignIn,googlesignOut } from '../../social/Googleauth';
import { styles } from './SignUpStyle';
const Signup = () => {
  const navigation=useNavigation()
  const {setprofiledata} = useContext(MyContext);
  return (
    <View style={styles.container}>
      <Image source={IMAGES.SPOTIFY} style={styles.imgspot} />
      <Text style={styles.millsong}>Millions of songs.</Text>
      <Text style={styles.free}>Free on Spotify.</Text>
      <TouchableOpacity
        onPress={() => {
          console.log('Sign up for free');
        }}
        style={styles.signupfree}>
        <Text style={styles.textsignupfree}>Sign up for free</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('Sign up for phone number');
        }}
        style={styles.pressimgphone}>
        <Image source={IMAGES.PHONE} style={styles.imgphone} />
        <Text style={styles.textphone}>Continue with phone number</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
         const p=await googlesignIn();
          setprofiledata(p.user)
          navigation.navigate('Dob');
          console.log('Sign up for Google');
        }}
        style={styles.pressgoogle}>
        <Image source={IMAGES.GOOGLE} style={{height: 30, width: 30}} />
        <Text style={styles.imggoogle}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          googlesignOut();
          console.log('Sign up for Facebook');
        }}
        style={styles.pressfacebook}>
        <Image source={IMAGES.FACEBOOK} style={{height: 24, width: 24}} />
        <Text style={styles.textface}>Continue with Facebook</Text>
      </TouchableOpacity>
      <Text style={styles.textface}>Log in</Text>
    </View>
  );
};

export default Signup;
