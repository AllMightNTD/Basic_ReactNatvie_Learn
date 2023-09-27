import axios from "axios";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Toast } from "toastify-react-native";
const validationSchema = Yup.object().shape({
  tenUngVien: Yup.string()
    .required("Tên ứng viên không được bỏ trống")
    .min(25, "Tên ứng viên tối thiểu 25 kí tự"),
  maUngVien: Yup.string()
    .required("Mã ứng viên không được bỏ trống")
    .min(8, "Mã ứng viên tối thiểu 8 kí tự"),
  className: Yup.string().required("Class không được bỏ trống"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được bỏ trống"),
  address: Yup.string().required("Địa chỉ không được bỏ trống"),
});
const CandidateForm = ({ navigation }) => {
  const initialValues = {
    tenUngVien: "",
    maUngVien: "",
    className: "",
    email: "",
    address: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://kiemtra.stecom.vn:8888/api/ung-vien/NTD1512665/create",
        values
      );
      if (response.status === 200) {
        Toast.success("Tạo mới thành công");
        navigation.navigate("Home");
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.boxTitle}>
          <Pressable onPress={() => navigation.goBack()} style={styles.button}>
            <Text>Go back</Text>
          </Pressable>
          <Text style={styles.textTitle}>Tạo mới ứng viên</Text>
        </View>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={styles.boxForm}>
                <Text style={styles.title}>Tên ứng viên</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tên ứng viên"
                  onChangeText={handleChange("tenUngVien")}
                  onBlur={handleBlur("tenUngVien")}
                  value={values.tenUngVien}
                ></TextInput>
                {touched.tenUngVien && errors.tenUngVien ? (
                  <Text style={styles.errorText}>{errors.tenUngVien}</Text>
                ) : null}
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.title}>Mã ứng viên</Text>
                <TextInput
                  onChangeText={handleChange("maUngVien")}
                  onBlur={handleBlur("maUngVien")}
                  value={values.maUngVien}
                  style={styles.input}
                  placeholder="Mã ứng viên"
                ></TextInput>
                {touched.maUngVien && errors.maUngVien ? (
                  <Text style={styles.errorText}>{errors.maUngVien}</Text>
                ) : null}
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.title}>Class</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("className")}
                  onBlur={handleBlur("className")}
                  value={values.className}
                  placeholder="Class"
                ></TextInput>
                {touched.className && errors.className ? (
                  <Text style={styles.errorText}>{errors.className}</Text>
                ) : null}
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Email"
                ></TextInput>
                {touched.email && errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.title}>Địa chỉ</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                  placeholder="Address"
                ></TextInput>
                {touched.address && errors.address ? (
                  <Text style={styles.errorText}>{errors.address}</Text>
                ) : null}
              </View>
              <View style={styles.boxTitle}>
                <Pressable onPress={handleSubmit} style={styles.button}>
                  <Text>Tạo mới</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 20,
    backgroundColor: "#F6F6F6",
  },
  boxForm: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 10,
    width: 70,
    borderWidth: 1, // Thêm đường viền cho nút
    borderColor: "#000", // Màu đường viền
    elevation: 3,
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    padding: 10,
    borderColor: "#333",
    borderRadius: 10,
  },
  boxTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTitle: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
});
export default CandidateForm;
