import React, { useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: product.title });
  }, [navigation, product]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.images[0] }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});

export default ProductDetails;
