import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles as styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';

const metals = [
    { name: 'Gold', symbol: 'XAU' },
    { name: 'Silver', symbol: 'XAG' },
    { name: 'Platinum', symbol: 'XPT' },
    { name: 'Palladium', symbol: 'XPD' },
];

// Static/mock prices in INR per gram
const mockPrices = {
    XAU: 1080.00,
    XAG: 109.50,
    XPT: 3826.00,
    XPD: 3110.00,
};

export default function HomeScreen() {
    const navigation = useNavigation();
    const [prices, setPrices] = useState({});

    useEffect(() => {
        const initialPrices = {};
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        metals.forEach((metal) => {
            initialPrices[metal.symbol] = { price: mockPrices[metal.symbol], time: now };
        });
        setPrices(initialPrices);
    }, []);

    const renderItem = ({ item }) => {
        const data = prices[item.symbol];
        if (!data) return null;

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('MetalDetail', { symbol: item.symbol })}
            >
                <Text style={styles.metalName}>{item.name}</Text>

                <View style={styles.priceRow}>
                    <Ionicons name="cash-outline" size={18} color="#FFD700" style={styles.priceIcon} />
                    <Text style={styles.priceText}>Price: ₹ {data.price.toFixed(2)} /g</Text>
                </View>

                <View style={styles.timeRow}>
                    <Ionicons name="time-outline" size={16} color="#A0AEC0" style={styles.timeIcon} />
                    <Text style={styles.timeText}>Updated: {data.time}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Metal Prices</Text>
            <Text style={styles.fallbackWarning}>
                ⚠️ Showing mock prices
            </Text>
            <FlatList
                data={metals}
                keyExtractor={(item) => item.symbol}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}
