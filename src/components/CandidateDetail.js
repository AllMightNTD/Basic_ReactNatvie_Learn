import axios from "axios";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Button } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";
import { Modal } from "react-native";
import { Toast } from "toastify-react-native";
const CandidateDetail = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [detailCandidate, setDetailCandidate] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getDataDetail();
  }, []);
  const getDataDetail = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(
        `http://kiemtra.stecom.vn:8888/api/ung-vien/NTD1512665/${itemId}`
      );
      if (response.status === 200) {
        setDetailCandidate(response.data);
        setRefreshing(false);
      }
    } catch (error) {}
  };
  const deleteCandidate = async () => {
    try {
      const response = await axios.delete(
        `http://kiemtra.stecom.vn:8888/api/ung-vien/NTD1512665/${itemId}`
      );
      if (response.status === 200) {
        Toast.success("Đã xóa thành công");
        setModalVisible(false);
        navigation.goBack();
      }
    } catch (error) {}
  };
  const onRefresh = () => {
    setRefreshing(true);
    getDataDetail();
  };
  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.boxTitle}>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonBack}>Go back</Text>
          </Pressable>
          <Text style={styles.textTitle}>Chi tiết ứng viên</Text>
          <Pressable
            style={styles.buttonDelete}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonBack}>Xóa ứng viên</Text>
          </Pressable>
        </View>
        <Text style={styles.postTitle}>
          {detailCandidate ? detailCandidate.id : ""}
        </Text>
        <Text style={styles.postTitle}>
          Mã ứng viên : {detailCandidate ? detailCandidate.maUngVien : ""}
        </Text>
        <Text style={styles.desTitle}>
          Tên ứng viên : {detailCandidate ? detailCandidate.tenUngVien : ""}
        </Text>
        <Text style={styles.desTitle}>
          Mô tả kinh nghiệm :
          {detailCandidate ? detailCandidate.moTaKinhNghiem : ""}
        </Text>
        <Text style={styles.desTitle}>
          Email :{detailCandidate ? detailCandidate.email : ""}
        </Text>
        <Text style={styles.desTitle}>
          Địa chỉ :{detailCandidate ? detailCandidate.diaChi : ""}
        </Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Bạn có muốn xóa nhân viên này không ???</Text>
              <View style={styles.containerModal}>
                <Pressable
                  style={[styles.button]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text
                    onPress={() => setModalVisible(false)}
                    style={styles.textStyle}
                  >
                    Hủy bỏ
                  </Text>
                </Pressable>
                <Pressable style={[styles.button]} onPress={deleteCandidate}>
                  <Text style={styles.textStyle}>Xóa</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    height: "100%",
    backgroundColor: "#f6f6f6",
  },
  containerModal: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,

    padding: 35,
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textStyle: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  textTitle: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
  boxTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 3,
    marginBottom: 20,
  },
  buttonDelete: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    display: "flex",
    textAlign: "center",
    borderRadius: 10,
    width: 100,
    borderWidth: 1, // Thêm đường viền cho nút
    borderColor: "#000", // Màu đường viền
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    display: "flex",
    textAlign: "center",
    borderRadius: 10,
    width: 70,
    borderWidth: 1, // Thêm đường viền cho nút
    borderColor: "#000", // Màu đường viền
  },
  desTitle: {
    fontSize: 14,
    marginTop: 10,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
});

export default CandidateDetail;
