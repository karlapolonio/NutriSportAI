import Form from './screens/Form';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Form />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
