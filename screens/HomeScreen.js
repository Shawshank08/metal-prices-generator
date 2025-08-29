import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles as styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const metals = [
  { name: 'Gold', symbol: 'XAU' },
  { name: 'Silver', symbol: 'XAG' },
  { name: 'Platinum', symbol: 'XPT' },
  { name: 'Palladium', symbol: 'XPD' },
];

const API_KEY = Constants.expoConfig.extra.goldApiKey;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFallbackUsed, setIsFallbackUsed] = useState(false);

  useEffect(() => {
    fetchAllPrices();
    const interval = setInterval(fetchAllPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchAllPrices = async () => {
    setLoading(true);
    const newPrices = {};
    let fallbackUsed = false;

    for (const metal of metals) {
      try {
        const res = await fetch(`https://www.goldapi.io/api/${metal.symbol}/INR`, {
          headers: {
            'x-access-token': API_KEY,
            'Content-Type': 'application/json',
          },
        });

        if (res.status !== 200) throw new Error('API Limit or Error');

        const data = await res.json();
        newPrices[metal.symbol] = {
          price: data.price.toFixed(2),
          time: data.timestamp
            ? new Date(data.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } catch (err) {
        fallbackUsed = true;
        newPrices[metal.symbol] = {
          price: getMockPrice(metal.symbol),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }
    }

    setIsFallbackUsed(fallbackUsed);
    setPrices(newPrices);
    setLoading(false);
  };

  const getMockPrice = (symbol) => {
    switch (symbol) {
      case 'XAU': return '9634.69';
      case 'XAG': return '109.60';
      case 'XPT': return '3820.38';
      case 'XPD': return '3120.00';
      default: return '--';
    }
  };

  const renderItem = ({ item }) => {
    const data = prices[item.symbol];
    const gramsInOunce = 31.1035;
    const perGram = (data.price / gramsInOunce).toFixed(2);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('MetalDetail', { symbol: item.symbol })}
      >
        <Text style={styles.metalName}>{item.name}</Text>

        <View style={styles.priceRow}>
          <Ionicons name="cash-outline" size={18} color="#FFD700" style={styles.priceIcon} />
          <Text style={styles.priceText}>Price: ₹ {perGram} /g</Text>
        </View>

        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={16} color="#A0AEC0" style={styles.timeIcon} />
          <Text style={styles.timeText}>Updated: {data?.time ?? '--:--'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Fetching metal prices...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Metal Prices</Text>
      {isFallbackUsed && <Text style={styles.fallbackWarning}>⚠️ Showing mock prices</Text>}
      <FlatList
        data={metals}
        keyExtractor={(item) => item.symbol}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
