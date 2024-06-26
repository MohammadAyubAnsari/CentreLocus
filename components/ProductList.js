import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const navigation = useNavigation();

  const fetchProducts = async () => {
    if (loading || isLastPage) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=${page * 10}&limit=10`
      );
      if (response.data.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...response.data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setIsLastPage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
    >
      <View style={styles.productContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListFooterComponent={renderFooter}
      onEndReached={fetchProducts}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productTitle: {
    fontSize: 16,
  },
});

export default ProductList;
