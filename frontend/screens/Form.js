import { Text, TextInput, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Form() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={100} // adjust if needed
          style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.formTitle}>Form</Text>
                    <Text style={styles.formSubtitle}>
                        Help us understand your profile to create personalized recommendations
                    </Text>
                    </View>

                    {/* Row 1: Age + Height */}
                    <View style={styles.row}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Age</Text>
                        <TextInput style={styles.input} placeholder="25" keyboardType="numeric" />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Height (cm)</Text>
                        <TextInput style={styles.input} placeholder="175" keyboardType="numeric" />
                    </View>
                    </View>

                    {/* Row 2: Weight + Gender */}
                    <View style={styles.row}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Weight (kg)</Text>
                        <TextInput style={styles.input} placeholder="70" keyboardType="numeric" />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Gender</Text>
                        {/* Temporary TextInput — replace with dropdown later */}
                        <TextInput style={styles.input} placeholder="Male/Female" />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputGroup: {
    width: '48%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
});
