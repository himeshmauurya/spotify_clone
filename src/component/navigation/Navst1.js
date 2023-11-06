import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../Home/Home';
import Signup from '../authentication/signup/Signup';

import CurrSong from '../playsong/CurrSong';

import Bottomnav from './Bottomnav';
import Dob from '../authentication/signup/Dob';
import Favitem from '../favourite/Favitem';
import Playlist from '../playlist/Playlist';
function Navst1() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Bottomnav" component={Bottomnav} />

        <Stack.Screen name="Favitem" component={Favitem} />

        <Stack.Screen name="Playlist" component={Playlist} />
        <Stack.Screen name="CurrSong" component={CurrSong} />

        <Stack.Screen name="Dob" component={Dob} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navst1;
