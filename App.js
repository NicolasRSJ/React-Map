import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from "expo-location";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null)
  const [hasLatitude, setHasLatitude] = useState(null)
  const [hasLongitude, setHasLongitude] = useState(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission( status === 'granted' )

      let location = await Location.getCurrentPositionAsync({});
      setHasLatitude(location.coords.latitude);
      setHasLongitude(location.coords.longitude);
    })();
  }, [])

  if(hasPermission === null){
    <View/>
  }
  if(hasPermission === false){
    return alert('Acesso Negado!')
  }


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: hasLatitude,
          longitude: hasLongitude,
          latitudeDelta: 0.0042,
          longitudeDelta: 0.0031,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: hasLatitude,
            longitude: hasLongitude
          }}
        
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  map:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
