import 'dotenv/config'; // loads variables from .env

export default ({ config }) => ({
  ...config,
  expo: {
    ...config.expo,
    name: "metal-prices-generator-js",
    slug: "metal-prices-generator-js",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    platforms: ["ios", "android", "web"],
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      goldApiKey: process.env.GOLD_API_KEY
    }
  }
});
