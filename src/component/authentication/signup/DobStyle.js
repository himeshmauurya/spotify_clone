import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textdob: {
    fontSize: 30,
  },
  seldate: {
    color: 'white',
    fontSize: 17,
    margin: 5,
     fontWeight: '600',
  },
  pressnext: {
    flexDirection: 'row',
    backgroundColor: 'green',
    width: wp('40%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
    marginTop: 90,
  },
  textnext: {
    color: 'black',
    fontSize: 17,
    margin: 5,
    
  },
});
