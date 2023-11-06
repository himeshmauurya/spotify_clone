import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    StatusBar,
  } from 'react-native';
  import React, {useState, useContext, useEffect} from 'react';
  import {useNavigation} from '@react-navigation/native';
  // import {songsList2} from '../../../SongsList';
  import { songsList2 } from '../config/SongList';
  import {MyContext} from '../context/MyProvider';
  import TrackPlayer, {
    usePlaybackState,
    useTrackPlayerEvents,
  } from 'react-native-track-player';
import { styles } from './FavlistStyle';

  
const Favlist = (props) => {
 const {val}=props
 const {curr, setcurr, recent, setrecent, fav, setfav} = useContext(MyContext);
console.log(val)
  return (
    <View
    style={styles.container}>
    <View
      style={styles.box1}>
      <Image
        source={{uri: val.artwork}}
        style={styles.img1}
      />
      <View style={{marginLeft:20}}>
        <Text style={{color: 'white'}}>{val.title}</Text>
        <Text style={{color: 'white', fontSize: 10}}>
          {val.artist}
        </Text>
      </View>
    </View>
    <View
      style={styles.favredimg}>
        <TouchableOpacity onPress={()=>{
            let k=fav.filter((va1)=>{
                 return va1.id!=val.id
            })  
             setfav(k)
        }}>
      <Image
        source={require('../../images/fav_red.png')}
        style={styles.favredimg2}
      />
      </TouchableOpacity>
      <Image
        source={require('../../images/option.png')}
        style={styles.option}
      />
    </View>
  </View>
  )
}

export default Favlist