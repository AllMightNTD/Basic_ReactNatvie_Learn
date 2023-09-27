import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/components/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToastManager from "toastify-react-native";
import CandidateDetail from "./src/components/CandidateDetail";
import CandidateForm from "./src/components/CandidateForm";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <ToastManager />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CandidateDetail" component={CandidateDetail} />
        <Stack.Screen name="CandidateForm" component={CandidateForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
