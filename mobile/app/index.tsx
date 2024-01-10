import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "expo-router";
import {withExpoSnack} from "nativewind";

const App = () => {
    const router = useNavigation();

    const isLogged = async (): Promise<boolean> => {
        const token = await AsyncStorage.getItem("token");
        let response: Response;

        if (!token) {
            return false;
        }
        try {
            response = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/users/me`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        } catch (error) {
            console.error("Error checking login status:", error);
            return false;
        }
        return response.ok;
    };

    async function checkAuth() {
        if (await isLogged()) {
            router.navigate("home" as never);
        } else {
            router.navigate("register" as never);
        }
    }

    (async () => {
        await checkAuth();
    })();
    return <></>;
};

export default withExpoSnack(App);
