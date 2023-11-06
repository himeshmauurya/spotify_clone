import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import { styles } from './FavitemStyle';
import React, {useState, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
// import {songsList2} from '../../../SongsList';
import { songsList2 } from '../config/SongList';
import {MyContext} from '../context/MyProvider';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Favlist from './Favlist';
import LinearGradient from 'react-native-linear-gradient';

const Favitem = () => {
  const navigation = useNavigation();
  const {curr, setcurr, recent, setrecent, fav, setfav} = useContext(MyContext);
  return (
    <LinearGradient
      colors={['#191f63', '#0b0c1c', '#241001', '#000000']}
      style={{flex: 1}}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('../../images/left.png')}
          style={styles.left}
        />
      </TouchableOpacity>
      <Text style={styles.textlike}>Liked Song</Text>
      <ScrollView contentContainerStyle={{}}>
        {fav.map(val => {
          return (
            <TouchableOpacity  key={val.id} onPress={() => {
              //  console.log('Favitem', val);
                navigation.navigate('CurrSong', {currItem: val});
              }}>
            <Favlist val={val}/>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
};

export default Favitem;
