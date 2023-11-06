import React, {useEffect, useState, useContext} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {MyContext} from '../context/MyProvider';
import TrackPlayer, {
  State,
  Capability,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';

import { setupPlayer } from '../config/musicController';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';

import { songsList2 } from '../config/SongList';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const CurrSong = () => {
  const {curr, setcurr, recent, setrecent} = useContext(MyContext);

  const navigation = useNavigation();
  const route = useRoute();
  const {currItem} = route.params;
  const playbackState = usePlaybackState();
  const progress = useProgress(currItem.duration);
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(1);
  const changeVolume = newVolume => {
    setVolume(newVolume);
    TrackPlayer.setVolume(newVolume);
  };
  //console.log(currItem);
  useEffect(() => {
    async function setup() {
      const idToRemove = currItem.id;
      const indexToRemove = recent.findIndex(obj => obj.id === idToRemove);

      if (indexToRemove !== -1) {
        const updatedArray = recent
          .slice(0, indexToRemove)
          .concat(recent.slice(indexToRemove + 1));

        console.log(updatedArray);
        setrecent([currItem, ...updatedArray]);
      } else {
        console.log('Object not found with ID:', idToRemove);
        setrecent([currItem, ...recent]);
      }

      let isSetup = await setupPlayer();
      await TrackPlayer.reset();
      await TrackPlayer.add([currItem]);
      await TrackPlayer.play();
      setPlay(isSetup);
    }
    setup();
  }, [currItem]);

  if (!play) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  function format(seconds) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
  return (
    <>
      <LinearGradient
        colors={['#067a02', '#064f03', '#032901', '#000000']}
        style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          style={{marginBottom: 50, marginLeft: 20, marginTop: 30}}
          onPress={async() => {
            navigation.goBack();
            await TrackPlayer.reset();
            await TrackPlayer.add(songsList2);
            
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

        <Image
          source={{uri: currItem.artwork}}
          style={{
            width: '80%',
            height: '35%',
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 5,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            color: 'white',
            fontWeight: '600',
            marginLeft: 20,
            marginTop: 20,
          }}>
          {currItem.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontWeight: '600',
            marginLeft: 20,
          }}>
          {currItem.artist}
        </Text>
        <Slider
          style={{width: '90%', height: 40, alignSelf: 'center'}}
          minimumValue={0}
          maximumValue={progress.duration}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#fff"
          value={progress.position}
          onValueChange={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'white'}}>{format(progress.position)}</Text>
          <Text style={{color: 'white'}}>{format(progress.duration)}</Text>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            //flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 30,
            marginBottom: 80,
            // backgroundColor:'yellow'
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: 200,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <TouchableOpacity
              onPress={async () => {
                const currentPosition = await TrackPlayer.getPosition();
                const duration = await TrackPlayer.getDuration();
                if (currentPosition - 10 <= 0) {
                  await TrackPlayer.seekTo(0);
                } else {
                  await TrackPlayer.seekTo(currentPosition - 10);
                }
              }}>
              <Image
                source={require('../../images/teninc.png')}
                style={{width: 35, height: 35, tintColor: 'white'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={async () => {
                console.log(playbackState, 'playbackState');
                console.log(State, 'State');
                if (playbackState.state === State.Playing) {
                  await TrackPlayer.pause();
                  console.log('Paused');
                } else {
                  await TrackPlayer.play();
                  console.log('Playing');
                }
              }}>
              <Image
                source={
                  State.Playing == playbackState.state
                    ? require('../../images/pause2.png')
                    : require('../../images/play.png')
                }
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                const currentPosition = await TrackPlayer.getPosition();
                const duration = await TrackPlayer.getDuration();
                if (currentPosition + 10 > duration) {
                  await TrackPlayer.seekTo(0);
                } else {
                  await TrackPlayer.seekTo(currentPosition + 10);
                }
              }}>
              <Image
                source={require('../../images/tendec.png')}
                style={{width: 35, height: 35, tintColor: 'white'}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => changeVolume(Math.max(0, volume - 0.1))}>
              <Image
                source={require('../../images/dec.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'white',
                  objectFit: 'contain',
                }}
              />
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 16, marginHorizontal: 10}}>
              {Math.round(volume * 100)}%
            </Text>
            <TouchableOpacity
              onPress={() => changeVolume(Math.min(1, volume + 0.1))}>
              <Image
                source={require('../../images/inc.png')}
                style={{width: 30, height: 30, tintColor: 'white'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      {/* <Button title="Play" onPress={() => TrackPlayer.play()} />
      <Button
        title="Pause"
        color="#000"
        onPress={() => TrackPlayer.pause()}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
});

export default CurrSong;
