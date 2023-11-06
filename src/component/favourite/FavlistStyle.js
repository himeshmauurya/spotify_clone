import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container:{
        height: 70,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      //marginLeft:20
      justifyContent: 'space-between',
    },
    box1:{
          // borderColor: 'red',
        // borderWidth: 1,
        width: '60%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        //marginLeft:20
        //justifyContent: 'space-between',
    },img1:{
        width: 50,
        height: 50,
        borderRadius: 5,
        marginBottom: 2,
    },
    favredimg:{
          // borderColor: 'red',
        // borderWidth: 1,
        width: '30%',
        height: '100%',
        flexDirection:'row',
        alignItems: 'center',
      justifyContent: 'space-between',
    },
    favredimg2:{
        width: 20,
        height: 20,
        borderRadius: 5,
        marginRight: 10,
        objectFit:'contain'
        //marginBottom: 2,
    },
    option:{
        width: 18,
        height: 18,
        tintColor: '#bababa',
        marginRight: 10,
        marginLeft: 10,
    }

})