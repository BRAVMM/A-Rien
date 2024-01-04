import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { withExpoSnack } from "nativewind";

const App = () => {
  const router = useNavigation();

  async function checkAuth() {
    AsyncStorage.clear();
    const token = await AsyncStorage.getItem("token");
    if (token) {
      router.navigate("home" as never);
    } else {
      router.navigate("register" as never);
    }
  }

  checkAuth().then(r => r);
  return <></>;
};

export default withExpoSnack(App);
