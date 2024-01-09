import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { withExpoSnack } from "nativewind";

const App = () => {
  const router = useNavigation();

  const isLogged = async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      return false;
    }
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/users/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.ok;
  };

  async function checkAuth() {
    if (await isLogged()) {
      router.navigate("home" as never);
    } else {
      router.navigate("register" as never);
    }
  }

  checkAuth().then(r => r);
  return <></>;
};

export default withExpoSnack(App);
