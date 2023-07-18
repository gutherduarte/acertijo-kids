import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { Welcome } from "./src/screens/Welcome";
import { GameSelection } from './src/screens/GameSelection';
import { Vowels } from './src/screens/Vowels';
import { Memorize } from './src/screens/Memorize';
import { Tetris } from './src/screens/Tetris';
import { MathGame } from './src/screens/MathGame';
import { Colors } from './src/screens/Colors';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
        <Stack.Screen options={{ headerShown: false }} name="GameSelection" component={GameSelection} />
        <Stack.Screen options={{ headerShown: false }} name="Vowels" component={Vowels} />
        <Stack.Screen options={{ headerShown: false }} name="Memorize" component={Memorize} />
        <Stack.Screen options={{ headerShown: false }} name="Tetris" component={Tetris} />
        <Stack.Screen options={{ headerShown: false }} name="Colors" component={Colors} />
        <Stack.Screen options={{ headerShown: false }} name="Math" component={MathGame} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
