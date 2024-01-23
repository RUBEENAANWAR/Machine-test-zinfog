import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import fetchMapData from '../src/api/api';
import {useDispatch, useSelector} from 'react-redux';
import {MarkerIcon, Close} from '../src/components/svg';
import {moderateScale} from 'react-native-size-matters';
import SaveConfirmationModal from '../src/components/SaveConfirmationModal';
import {saveLocation, selectSavedLocations} from '../src/redux/mapSlice';
import {fetchPlaceName} from '../src/apis/googleApi';

export default function ScreenMap() {
  const dispatch = useDispatch();
  const savedLocations = useSelector(selectSavedLocations);
  const [placeName, setPlaceName] = useState('');
  const [markers, setMarkers] = useState([
    {
      title: 'hello',
      address: 'testing 1',
      coordinates: {
        latitude: 3.148561,
        longitude: 101.652778,
      },
    },
    {
      title: 'hello',
      address: 'testing 1',
      coordinates: {
        latitude: 3.149771,
        longitude: 101.655449,
      },
    },
  ]);
  const [marker, setMarker] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  // const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSaveModalVisible, setSaveModalVisible] = useState(false);
  const [closeIcon, setCloseIcon] = useState(false);

  // const fetchDataFromAPI = async (latitude, longitude) => {
  //   try {
  //     const apiUrl =
  //       'https://nominatim.openstreetmap.org/reverse?format=json&lat=10.6677032&lon=75.988872&zoom=18&addressdetails=1-';
  //     const response = await fetch(apiUrl);
  //     const data = await response.json();
  //     setMarkers(data);
  //     setSelectedPlace(data);
  //   } catch (error) {
  //     Alert.alert('Something went wrong.. please try after sometimes');
  //   }
  // };

  // useEffect(()=>{
  //   fetchDataFromAPI(latitude, longitude);
  // })
  const handleMapPress = event => {
    console.log('modal clicked');
    const {coordinate, title} = event.nativeEvent;
    console.log('coordinate--', coordinate);
    console.log('title--', title);
    // setMarkers(prevMarkers => [...prevMarkers, coordinate]);
    setSelectedLocation({...coordinate, title});
    setShowModal(true);
  };

  useEffect(() => {
    if (selectedLocation) {
      fetchPlaceName(
        selectedLocation.latitude,
        selectedLocation.longitude,
      ).then(result => setPlaceName(result));
    }
  }, [selectedLocation]);

  const handleSavePress = () => {
    setSaveModalVisible(true);
  };

  const handleSaveConfirmation = () => {
    const locationData = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      address: placeName,
      time: currentTime,
    };
    dispatch(saveLocation(locationData));
    Alert.alert('Saved!', 'Location has been saved successfully.');
    setSaveModalVisible(false);
  };

  const handleCancelSave = () => {
    setSaveModalVisible(false);
  };

  const currentTime = new Date().toLocaleString();

  return (
    <View style={styles.body}>
      {/* {isLoading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator />
          <ActivityIndicator size="large" />
        </View>
      ) : ( */}
      <>
        <Text style={styles.headingText}>Map View </Text>
        <MapView
          style={styles.map}
          initialRegion={{
            // latitude: 37.78825,
            // longitude: -122.4324,
            latitude: markers.lat || 37.78825,
            longitude: markers.lon || -122.4324,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          zoomEnabled={true}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          onPress={handleMapPress}>
          {selectedLocation && (
            <Marker
              style={{position: 'relative'}}
              coordinate={selectedLocation}
              title={`Lat: ${selectedLocation.latitude.toFixed(5)}`}
              description={`Lon: ${selectedLocation.longitude.toFixed(5)}`}
            />
          )}
        </MapView>
        {selectedLocation && (
          <View
            style={styles.detailsBox}>
            <Text
              style={styles.markerHeading}>
              Marker Details
            </Text>
            <Text style={styles.itemTextStyle}>Place Name: {placeName}</Text>
            <Text style={styles.itemTextStyle}>
              Latitude: {selectedLocation?.latitude.toFixed(5)}
            </Text>
            <Text style={styles.itemTextStyle}>
              Longitude: {selectedLocation?.longitude.toFixed(5)}
            </Text>
            <Text style={styles.itemTextStyle}>Time: {currentTime}</Text>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={handleSavePress}
                style={styles.saveBox}>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
      <SaveConfirmationModal
        isVisible={isSaveModalVisible}
        onOk={handleSaveConfirmation}
        onCancel={handleCancelSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#a8cbf0',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  headingText: {
    height: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: moderateScale(18),
    color: '#000',
    marginVertical: moderateScale(15),
    textAlign: 'center',
  },
  detailsBox:{
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    elevation: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  saveBox:{
    backgroundColor: '#0352fc',
    width: '15%',
    padding: moderateScale(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: moderateScale(8),
  }, 
  itemTextStyle:{textAlign: 'center'},
  markerHeading:{
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    paddingBottom: moderateScale(8),
  }
});
