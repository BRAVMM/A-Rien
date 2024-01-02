import { Stack } from 'expo-router';
import login from './login';
import index from './index';
export default function Layout() {
  return <Stack initialScreen="login" screens={{ login, index }} screenOptions={
    {
      headerShown: false,
    }
  }>
  </Stack>
}
