import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles as styles } from '../styles/styles';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig.extra.goldApiKey;

export default function MetalDetail() {
  const route = useRoute();
  const { symbol } = route.params;
  const [metalData, setMetalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFallbackUsed, setIsFallbackUsed] = useState(false);

  useEffect(() => {
    fetchMetalData();
  }, []);

  const fetchMetalData = async () => {
    const gramsInOunce = 31.1035;
    const fallbackPrice = 9634.69;
    const fallbackOpen = 109.60;
    const fallbackPrev = 3820.38;
    const fallbackAsk = 3120.00;

    try {
      const res = await fetch(`https://www.goldapi.io/api/${symbol}/INR`, {
        headers: {
          'x-access-token': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (res.status !== 200) throw new Error('API Limit or Error');

      const data = await res.json();
      setMetalData({
        price: (data.price / gramsInOunce).toFixed(2),
        open_price: (data.open_price / gramsInOunce).toFixed(2),
        prev_close_price: (data.prev_close_price / gramsInOunce).toFixed(2),
        ask: (data.ask / gramsInOunce).toFixed(2),
        timestamp: data.timestamp,
      });
    } catch (err) {
      setIsFallbackUsed(true);
      setMetalData({
        price: (fallbackPrice / gramsInOunce).toFixed(2),
        open_price: (fallbackOpen / gramsInOunce).toFixed(2),
        prev_close_price: (fallbackPrev / gramsInOunce).toFixed(2),
        ask: (fallbackAsk / gramsInOunce).toFixed(2),
        timestamp: Date.now() / 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const metalNames = {
    XAU: 'Gold',
    XAG: 'Silver',
    XPT: 'Platinum',
    XPD: 'Palladium',
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Loading metal details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{metalNames[symbol]} Details</Text>
      {isFallbackUsed && <Text style={styles.fallbackWarning}>⚠️ Showing mock data</Text>}
      <View style={styles.card}>
        <View style={styles.detailRow}>
          <Ionicons name="cash-outline" size={18} color="#FFD700" style={styles.detailIcon} />
          <Text style={styles.detailText}>Price: ₹ {metalData.price}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="trending-up-outline" size={18} color="#4CAF50" style={styles.detailIcon} />
          <Text style={styles.detailText}>Open: ₹ {metalData.open_price}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="trending-down-outline" size={18} color="#FF5252" style={styles.detailIcon} />
          <Text style={styles.detailText}>Previous Close: ₹ {metalData.prev_close_price}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="pricetag-outline" size={18} color="#00BCD4" style={styles.detailIcon} />
          <Text style={styles.detailText}>Ask: ₹ {metalData.ask}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={18} color="#A0AEC0" style={styles.detailIcon} />
          <Text style={styles.detailText}>
            Time: {new Date(metalData.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    </View>
  );
}
