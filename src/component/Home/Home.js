import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
// import {songsList2} from '../../../SongsList';
import {songsList2} from '../config/SongList';
import {MyContext} from '../context/MyProvider';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {googlesignOut} from '../social/Googleauth';
import {styles} from './homeStyle';

const Home = () => {
  const navigation = useNavigation();
  const {curr, setcurr, recent, setrecent, profiledata,setprofiledata} = useContext(MyContext);
  function res() {
    if(profiledata==undefined){
      return;
    }
    googlesignOut();
    navigation.navigate('Signup');
    setprofiledata()
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* header */}
      <View style={styles.viewprofile}>
        {profiledata==undefined ? (
          <TouchableOpacity
            onPress={() => {
             console.log("unknown user")
            }}>
            <Image
               source={require('../../images/profile.png')}
              style={styles.imgprofile}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Image
              source={{uri: profiledata.photo}}
              style={styles.imgprofile}
            />
          </TouchableOpacity>
          
        )}
       <TouchableOpacity onPress={res}>
        {profiledata==undefined?null:<Text style={styles.signout}>Signout</Text>}
          
        </TouchableOpacity>
        
      </View>
      {/* recently played */}
      <View style={{}}>
        {recent.length > 0 ? (
          <Text style={styles.textrecent}>Recently played Songs</Text>
        ) : null}
        <View>
          {/* {!allrecentdata? */}
          <FlatList
            data={recent}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{margin: 8}}
                onPress={() => {
                  setcurr(item);
                  navigation.navigate('CurrSong', {currItem: item});
                }}>
                <Image source={{uri: item.artwork}} style={styles.imgcurr} />
                <Text style={styles.title}>Title : {item.title}</Text>
                <Text style={styles.artist}>Artist : {item.artist}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      {/* Hindi */}
      <View style={{marginTop: 20}}>
        <Text style={styles.hindi}>English Songs</Text>
        <View>
          {/* {!alldata? */}
          <FlatList
            data={songsList2}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{margin: 8}}
                onPress={() => {
                  //console.log(index)
                  setcurr(item);
                  //console.log('home', item);
                  navigation.navigate('CurrSong', {currItem: item});
                }}>
                <Image source={{uri: item.artwork}} style={styles.imgcurr} />
                <Text style={styles.title}>Title : {item.title}</Text>
                <Text style={styles.artist}>Artist : {item.artist}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      {/* Punjabi */}
      <View style={{marginTop: 20}}>
        <Text style={styles.hindi}>Punjabi Songs</Text>
        <View>
          {/* {!alldata? */}
          <FlatList
            data={songsList2}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{margin: 8}}
                onPress={() => {
                  //console.log(index)
                  setcurr(item);
                  //console.log('home', item);
                  navigation.navigate('CurrSong', {currItem: item});
                }}>
                <Image source={{uri: item.artwork}} style={styles.imgcurr} />
                <Text style={styles.title}>Title : {item.title}</Text>
                <Text style={styles.artist}>Artist : {item.artist}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      {/* English */}
      <View style={{marginTop: 20}}>
        <Text style={styles.hindi}>English Songs</Text>
        <View>
          {/* {!alldata? */}
          <FlatList
            data={songsList2}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{margin: 8}}
                onPress={() => {
                  //console.log(index)
                  setcurr(item);
                  //console.log('home', item);
                  navigation.navigate('CurrSong', {currItem: item});
                }}>
                <Image source={{uri: item.artwork}} style={styles.imgcurr} />
                <Text style={styles.title}>Title : {item.title}</Text>
                <Text style={styles.artist}>Artist : {item.artist}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
