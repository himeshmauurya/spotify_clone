
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'; 

  
  export const googlesignOut = async () => {
    try {
      await GoogleSignin.signOut();
      console.log("signout" )
    } catch (error) {
      console.error(error);
    }
  };
  
  export const googlesignIn = async () => {
    try {
      GoogleSignin.configure({
        offlineAccess: false,
        webClientId: '117185032024-7vcvtrfumij86tp524qmh9ossedbf6vf.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //  console.log(userInfo.user)
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      //console.log(userInfo.user)
      auth().signInWithCredential(googleCredentials);
      return userInfo;
      
    } catch (error) {
      console.log('=> Google Sign In', error);
      return null;
    }
  };
