import axios from "axios";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Toast } from "toastify-react-native";
import { RefreshControl } from "react-native";
import { ActivityIndicator } from "react-native";
function Home({ navigation }) {
  const handlePostClick = (id) => {
    navigation.navigate("CandidateDetail", {
      itemId: id,
    });
  };

  const [candidate, setCandidate] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://kiemtra.stecom.vn:8888/api/ung-vien/NTD1512665/get-all?pageSize=10&pageIndex=1"
      );
      if (response.status === 200) {
        setCandidate(response.data?.items);
        setRefreshing(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = () => {
    setCandidate([]);
    getData();
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.textTitle}>Danh sách bài viết</Text>
          <Pressable onPress={() => navigation.navigate("CandidateForm")}>
            <Text style={styles.textAdd}>+</Text>
          </Pressable>
        </View>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            placeholder="Id tìm kiếm...."
          ></TextInput>
          <Pressable style={styles.button}>
            <Text style={styles.textC}>Tìm kiếm</Text>
          </Pressable>
        </View>
        {refreshing ? <ActivityIndicator /> : null}
        <FlatList
          data={candidate}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePostClick(item.id)}>
              <View style={styles.candidate}>
                <Text style={styles.postTitle}>{item.id}</Text>
                <Text style={styles.postTitle}>{item.maUngVien}</Text>
                <Text style={styles.desTitle}>{item.tenUngVien}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 20,
    backgroundColor: "#F6F6F6",
  },
  candidate: {
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#333",
  },
  titleBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  desTitle: {
    fontSize: 14,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  textAdd: {
    fontSize: 25,
    color: "#000",
    fontWeight: "bold",
  },
  textTitle: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    justifyContent: "space-between", // Sử dụng space-between để tạo khoảng cách ngang giữa TextInput và Button
  },
  textC: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 10,
    backgroundColor: "#7B68EE",
    width: 70,
    borderWidth: 1, // Thêm đường viền cho nút
    borderColor: "#ccc", // Màu đường viền
    elevation: 3,
  },
  input: {
    flex: 1, // Để TextInput mở rộng và lấp đầy khoảng trống còn lại
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    padding: 10,
    borderColor: "#333",
    borderRadius: 10,
  },
});

export default Home;
