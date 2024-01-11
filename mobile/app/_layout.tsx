import { Stack } from "expo-router";

import home from "./home";
import index from "./index";
import login from "./login";
import profile from "./profile";
import register from "./register";

export default function Layout() {
  return (
    <Stack
      // @ts-ignore
      initialScreen="register"
      screens={{ login, register, home, index, profile }}
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
