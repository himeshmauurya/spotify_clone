import {
  View,
  Text,
  Image,
  StatusBar,
  Touchable,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {Children, useEffect, useState, useContext} from 'react';
import {MyContext} from '../context/MyProvider';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
// import {songsList2} from '../../../SongsList';
import { songsList2 } from '../config/SongList';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {useNavigation} from '@react-navigation/native';


const Playlist = () => {
  const {curr, setcurr, recent, setrecent, fav, setfav} = useContext(MyContext);
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setdata] = useState(songsList2);

  useEffect(() => {
    console.log('curr787', curr);
    data.map((val, ind) => {
      if (val.id == curr.id) {
        console.log('dssd', ind);
        setCurrentIndex(ind);
      }
      return val;
    });
  }, [curr]);
  useEffect(() => {
    let j = fav.some(obj => obj.id === data[currentIndex].id);
    if (j) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentIndex, fav]);
  // useEffect(() => {
  //   console.log('favlist', fav);
  //   let j=fav.some(obj => obj.id === data[currentIndex].id)
  //   if(j){
  //     setIsVisible(true)
  //   }else{
  //     setIsVisible(false)
  //   }
  // }, [fav]);
  const [volume, setVolume] = useState(1);
  const changeVolume = newVolume => {
    setVolume(newVolume);
    TrackPlayer.setVolume(newVolume);
  };
  // useEffect(async()=>{
  //   await TrackPlayer.reset();
  // },[])
  useEffect(() => {
    if (search.length == 0) {
      // console.log(data[currentIndex],"data[currentIndex")
      // setcurr(data[currentIndex])
      setdata(songsList2);
      songsList2.map((val, ind) => {
        if (val.id == data[currentIndex].id) {
          setCurrentIndex(ind);
        }
      });
      return;
    }
    // console.log('mhydata', data);
    let p = songsList2.filter(val => {
      return val.title.includes(search) || val.artist.includes(search);
    });
    const hasObjectWithId = p.some(song => song.id === data[currentIndex].id);
    // console.log(currentIndex, 'currentIndex');
    if (!hasObjectWithId) {
      p.push(data[currentIndex]);
    }
    // console.log(hasObjectWithId, 'hasObjectWithId');

    if (p.length > 0) {
      //console.log('p1', p);
      p.map((val, ind) => {
        if (val.id == data[currentIndex].id) {
          setCurrentIndex(ind);
        }
      });
      //setCurrentIndex(p.length-1)
      setdata(p);
    }
  }, [search]);
  useEffect(() => {
    // setupPlayer();
    //console.log('TracPlayer', TrackPlayer);
    // if (!TrackPlayer.isInitialized()) {
    setupPlayer();
    //  }
  }, []);
  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        // Media controls capabilities
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],

        // Icons for the notification on Android (if you don't like the default ones)
      });
      await TrackPlayer.add(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (State.Playing == playbackState.state) {
      if (progress.position.toFixed(0) == progress.duration.toFixed(0)) {
        if (currentIndex < data.length) {
          setCurrentIndex(currentIndex + 1);
        }
      }
    }
  }, [progress]);

  const shufflePlaylist = async () => {
    const shuffledPlaylist = [...data];
    for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlaylist[i], shuffledPlaylist[j]] = [
        shuffledPlaylist[j],
        shuffledPlaylist[i],
      ];
    }

    setdata(shuffledPlaylist);
    setCurrentIndex(0);
    await TrackPlayer.reset();
    await TrackPlayer.add(shuffledPlaylist);
    await TrackPlayer.skip(0);
    await TrackPlayer.play();
  };

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
          style={{
            width: 24,
            height: 24,
            tintColor: 'white',
            marginTop: 60,
            marginLeft: 20,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 20,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '85%',
            height: 37,
            backgroundColor: '#3f415c',
            borderRadius: 5,
            flexDirection: 'row',
            paddingLeft: 15,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../images/search2.png')}
            style={{width: 18, height: 18, tintColor: 'white'}}
          />

          <TextInput
            style={{color: 'white', marginLeft: 10, width: 250}}
            placeholder="Find in Playlist"
            value={search}
            onChangeText={text => {
              setSearch(text.trim());
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            const sortedData = [...data];
            sortedData.sort((a, b) => {
              const titleA = a.title.toLowerCase();
              const titleB = b.title.toLowerCase();
              if (titleA < titleB) {
                return -1;
              }
              if (titleA > titleB) {
                return 1;
              }
              return 0;
            });
            //get data of current playing song
            const p1 = data[currentIndex];
            setdata(sortedData);
            setcurr(p1);
          }}
          style={{
            width: '15%',
            height: 37,
            backgroundColor: '#3f415c',
            borderRadius: 5,

            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 5,
          }}>
          <Text style={{color: 'white', fontWeight: '600'}}>Sort</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{uri: data[currentIndex].artwork}}
        style={{
          width: '80%',
          height: '35%',
          alignSelf: 'center',
          marginTop: 20,
          borderRadius: 5,
          objectFit: 'contain',
        }}
      />
      <Text
        style={{
          fontSize: 30,
          color: 'white',
          fontWeight: '600',
          marginLeft: 20,
          marginTop: 10,
        }}>
        {data[currentIndex].title}
      </Text>
      <View style={{flexDirection: 'row', paddingLeft: 20, marginTop: 10}}>
        <Image
          source={require('../../images/spotify.png')}
          style={{width: 18, height: 18}}
        />

        <Text style={{color: 'white', fontSize: 14, marginLeft: 10}}>
          English Songs
        </Text>
      </View>
      <View style={{flexDirection: 'row', paddingLeft: 20, marginTop: 10}}>
        <Text style={{color: '#bababa', fontSize: 12}}>20,169 saves</Text>
        <Text style={{color: '#bababa', fontSize: 12, marginLeft: 10}}>
          4h 26m
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          marginTop: 10,
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => changeVolume(Math.min(1, volume + 0.1))}>
            <Image
              source={require('../../images/inc.png')}
              style={{
                width: 18,
                height: 18,
                tintColor: '#bababa',
                objectFit: 'contain',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeVolume(Math.max(0, volume - 0.1))}>
            <Image
              source={require('../../images/dec.png')}
              style={{
                width: 18,
                height: 18,
                tintColor: '#bababa',
                marginLeft: 15,
                objectFit: 'contain',
              }}
            />
          </TouchableOpacity>
          <Image
            source={require('../../images/option.png')}
            style={{
              width: 18,
              height: 18,
              tintColor: '#bababa',
              marginLeft: 15,
            }}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={shufflePlaylist}>
            <Image
              source={require('../../images/suffle.png')}
              style={{width: 30, height: 20, tintColor: '#bababa'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              if (State.Playing == playbackState.state) {
                await TrackPlayer.pause();
              } else {
                await TrackPlayer.skip(currentIndex);
                await TrackPlayer.play();
              }
            }}>
            {State.Playing == playbackState.state ? (
              <Image
                source={require('../../images/pause.png')}
                style={{
                  width: 40,
                  height: 35,
                  marginLeft: 20,
                  marginRight: 10,
                  tintColor: '#3ad934',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Image
                source={require('../../images/play-button.png')}
                style={{
                  width: 40,
                  height: 35,
                  marginLeft: 20,
                  marginRight: 10,
                  objectFit: 'contain',
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 10,
              }}
              onPress={async () => {
                console.log(index, 'index');
                setCurrentIndex(index);
                await TrackPlayer.pause();
                await TrackPlayer.skip(index);
                await TrackPlayer.play();
                const idToRemove = item.id;
                const indexToRemove = recent.findIndex(
                  obj => obj.id === idToRemove,
                );

                if (indexToRemove !== -1) {
                  const updatedArray = recent
                    .slice(0, indexToRemove)
                    .concat(recent.slice(indexToRemove + 1));

                  console.log(updatedArray);
                  setrecent([item, ...updatedArray]);
                } else {
                  console.log('Object not found with ID:', idToRemove);
                  setrecent([item, ...recent]);
                }
                //setrecent([item,...recent])
                // setCurrentIndex(index);
                // await TrackPlayer.pause();
                // await TrackPlayer.skip(index);
                // await TrackPlayer.play();
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: item.artwork}}
                  style={{width: 50, height: 50, borderRadius: 5}}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={{color: 'white'}}>{item.title}</Text>
                  <Text style={{color: 'white', fontSize: 10}}>
                    {item.artist}
                  </Text>
                </View>
                {index == currentIndex &&
                  State.Playing == playbackState.state && (
                    <Image
                      source={require('../../images/playing.png')}
                      style={{
                        width: 18,
                        height: 18,
                        tintColor: 'white',
                        marginLeft: 20,
                      }}
                    />
                  )}
              </View>

              {/* <View></View>
              <Image
                source={require('../../images/option.png')}
                style={{width: 18, height: 18, tintColor: '#bababa'}}
              /> 
              */}
              <View style={{flexDirection: 'row'}}>
                {/* {fav.some(obj => obj.id === item.id)?<Text>dd</Text>:<Text>kk</Text>} */}
                {fav.some(obj => obj.id === item.id) ? (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      //setIsVisible(false);
                      const p = fav.filter(val => {
                        return val.id != item.id;
                      });

                      setfav(p);
                    }}>
                    <Image
                      source={require('../../images/fav_red.png')}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5,
                        marginRight: 10,
                        //marginBottom: 2,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      //setIsVisible(true);
                      setfav([item, ...fav]);
                    }}>
                    <Image
                      source={require('../../images/fav_white.png')}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5,
                        marginRight: 10,
                        //marginBottom: 2,
                      }}
                    />
                  </TouchableOpacity>
                )}

                <Image
                  source={require('../../images/option.png')}
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: '#bababa',
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View>
        <View
          activeOpacity={1}
          style={{
            width: '100%',
            height: 70,
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            //flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '98%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 300,
              }}>
              <Image
                source={{uri: data[currentIndex].artwork}}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  marginBottom: 2,
                }}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{color: 'white'}}>{data[currentIndex].title}</Text>
                <Text style={{color: 'white', fontSize: 10}}>
                  {data[currentIndex].artist}
                </Text>
              </View>
              <View>
                <View>
                  {isVisible ? (
                    <TouchableOpacity
                      onPress={() => {
                        // setIsVisible(false);
                        const p = fav.filter(val => {
                          return val.id != data[currentIndex].id;
                        });

                        setfav(p);
                      }}>
                      <Image
                        source={require('../../images/fav_red.png')}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 5,
                          marginRight: 10,
                          //marginBottom: 2,
                        }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        // setIsVisible(true);
                        setfav([data[currentIndex], ...fav]);
                      }}>
                      <Image
                        source={require('../../images/fav_white.png')}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 5,
                          marginRight: 10,
                          //marginBottom: 2,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={async () => {
                if (State.Playing == playbackState.state) {
                  await TrackPlayer.pause();
                } else {
                  await TrackPlayer.skip(currentIndex);
                  await TrackPlayer.play();
                }
              }}>
              <Image
                source={
                  State.Playing == playbackState.state
                    ? require('../../images/pause2.png')
                    : require('../../images/play.png')
                }
                style={{width: 30, height: 30, tintColor: 'white'}}
              />
            </TouchableOpacity>
          </View>
          <Slider
            style={{width: '100%', height: 3, alignSelf: 'center'}}
            minimumValue={0}
            maximumValue={progress.duration}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#fff"
            value={progress.position}
            thumbTintColor="transparent"
          />
        </View>
      </View>
      
    </LinearGradient>
  );
};

export default Playlist;


