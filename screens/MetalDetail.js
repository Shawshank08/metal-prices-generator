import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { commonStyles as styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';

const mockPrices = {
  XAU: 5920.00,
  XAG: 72.50,
  XPT: 2840.00,
  XPD: 6840.00,
};

const mockDetails = {
  XAU: { open: 5900, prev: 5880, ask: 5935 },
  XAG: { open: 70, prev: 71, ask: 73 },
  XPT: { open: 2820, prev: 2830, ask: 2850 },
  XPD: { open: 6800, prev: 6820, ask: 6860 },
};

const metalNames = {
  XAU: 'Gold',
  XAG: 'Silver',
  XPT: 'Platinum',
  XPD: 'Palladium',
};

export default function MetalDetail() {
  const route = useRoute();
  const { symbol } = route.params;
  const [metalData, setMetalData] = useState(null);

  useEffect(() => {
    const now = Date.now() / 1000;
    setMetalData({
      price: mockPrices[symbol],
      open_price: mockDetails[symbol].open,
      prev_close_price: mockDetails[symbol].prev,
      ask: mockDetails[symbol].ask,
      timestamp: now,
    });
  }, []);

  if (!metalData) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{metalNames[symbol]} Details</Text>
      <Text style={styles.fallbackWarning}>
        ⚠️ Showing mock prices
      </Text>
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
