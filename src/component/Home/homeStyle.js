import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black'
    },
    viewprofile:{
      height: 50,
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      alignItems: 'center',
    },imgprofile:{
      width: 40, height: 40
    },signout:{
      color: 'white', fontSize: 16
    },textrecent:{
      color: 'white', fontSize: 23, margin: 10
    },imgcurr:{
      width: 200, height: 200
    },title:{
      color: 'white', fontSize: 12
    },artist:{
      color: 'white', fontSize: 15
    },hindi:{
      color: 'white', fontSize: 23, margin: 10
    }
  });
  