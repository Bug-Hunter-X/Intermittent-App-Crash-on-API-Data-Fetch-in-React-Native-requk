```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';

const DataFetch = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=20')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => setData(json.results))
      .catch((error) => {
        setError(error);
        Alert.alert('Error', `An error occurred: ${error.message}`);
        console.error('API fetch error:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
        error ? (
          <Text>Error fetching data. Please try again.</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ email }, index) => email}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name.title} {item.name.first} {item.name.last}</Text>
              </View>
            )}
          />
        )
      )}
    </View>
  );
};

export default DataFetch;
```