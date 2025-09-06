import Main from './screens/Main';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Main />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
