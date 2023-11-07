import Home from '../Home/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import Playlist from '../playlist/Playlist';
import Favitem from '../favourite/Favitem';

const Bottomnav = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#0b0e36',
          height: 38,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarLabelStyle: {color: 'white'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={{borderTopColor: 'white', borderTopWidth: 2}}>
                <Image
                  source={require('../../images/home.png')}
                  style={{height: 21, width: 23, objectFit: 'contain',marginBottom:0}}
                />
              </View>
            ) : (
              <Image
                source={require('../../images/home.png')}
                style={{height: 21, width: 23, objectFit: 'contain',marginBottom:0}}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={Playlist}
        options={{
          tabBarLabel: 'Playlist',
          headerShown: false,
          tabBarLabelStyle: {color: 'white'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={{borderTopColor: 'white', borderTopWidth: 2}}>
                <Image
                  source={require('../../images/playlist.png')}
                  style={{height: 21, width: 23, objectFit: 'contain',marginBottom:0}}
                />
              </View>
            ) : (
              <Image
                source={require('../../images/playlist.png')}
                style={{height: 21, width: 23, objectFit: 'contain',marginBottom:0}}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Favitem"
        component={Favitem}
        options={{
          tabBarLabel: 'Favitem',
          headerShown: false,
          tabBarLabelStyle: {color: 'white'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={{borderTopColor: 'white', borderTopWidth: 2}}>
                <Image
                  source={require('../../images/favbot.png')}
                  style={{height: 21, width: 23, objectFit: 'contain',marginBottom:0}}
                />
              </View>
            ) : (
              <Image
                source={require('../../images/favbot.png')}
                style={{height: 21, width: 23, objectFit: 'contain',marginBottom:0}}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Bottomnav;
