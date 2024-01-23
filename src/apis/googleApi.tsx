const fetchPlaceName  = async (latitude, longitude) => {
  const apiKey = 'AIzaSyDaUzlXc1-29lnFZqHwzdVrE-BALLOi3Tc';
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const firstResult = data.results[0];
      const formattedAddress = firstResult.formatted_address;
      return formattedAddress;
    } else {
      return 'Place name not available';
    }
  } catch (error) {
    console.error('Error fetching place name:', error);
    return 'Error fetching place name';
  }
};

export { fetchPlaceName  };