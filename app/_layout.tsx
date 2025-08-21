import { FavoritesProvider } from "@/context/favContext";
import { Stack } from 'expo-router';


export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack>

        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Movies"}} />

        <Stack.Screen name="auth/login" options={{ headerShown: false, title: "Login"}}/>
        <Stack.Screen name="auth/sign_up" options={{headerShown: false, title: "Sign Up"}}/>

        <Stack.Screen
          name="movies/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </FavoritesProvider>
  );
}
