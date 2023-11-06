import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode
} from 'react-native-track-player';
  
export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  }
  catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      progressUpdateEventInterval: 1,
    });

    isSetup = true;
  }
  finally {
    return isSetup;
  }
}

export async function addTrack() {
  await TrackPlayer.add([
    {
      id: '1',
      url: 'https://sample-music.netlify.app/death%20bed.mp3',
      artwork: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
      title: 'Make a cup of coffe',
      artist: 'Powfu',
      duration: 40,
    },
    {
      id: '2',
      url: "https://samplesongs.netlify.app/Faded.mp3",
      artwork: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
      title: 'Did you know',
      artist: 'Trail bleed',
      duration: 40, 
    },
    {
      id: '3',
      url: 'https://sample-music.netlify.app/Bad%20Liar.mp3',
      artwork: "https://samplesongs.netlify.app/album-arts/faded.jpg",
      title: 'Bad Liar',
      artist: 'Rain alphred',
      duration: 40, 
    }
    
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}
