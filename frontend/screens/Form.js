import { Text, TextInput, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    gender: '',
    bmi: '',
    activityLevel: '',
    sport: '',
    goal: '',
    dietaryType: '',
    allergies: [],
  });

  const genderList = ['Male','Female'];
  const [showGenderDD, setShowGenderDD] = useState(false);

  const activityLevelList = ['Sedentary (Desk job)', 'Light (1-3 workouts/week)', 'Moderate (3-5 workouts/week)', 'Active (6-7 workouts/week)', 'Extreme (2x/day, intense training)'];
  const [showActivityLevelDD, setShowActivityLevelDD] = useState(false);

  const sportList = ['Running', 'Cycling', 'Swimming', 'Weight Lifting', 'Football', 'Basketball', 'Tennis', 'CrossFit', 'Yoga', 'General Fitness'];
  const [showSportDD, setShowSportDD] = useState(false);

  const goalList = ['Loss Weight', 'Gain Weight', 'Gain Muscle', 'Improve Endurance','Increase Strength', 'Athletic Performance', 'Maintain Current Weight', 'Improve Recovery'];
  const [showGoalDD, setShowGoalDD] = useState(false);

  const dietTypeList = ['Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Ketogenic', 'Paleo', 'Mediterranean', 'Low Carb', 'Intermittent Fasting']
  const [showDietDD, setShowDietDD] = useState(false);

  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
      style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}
    >
        <ScrollView contentContainerStyle={{ flexGrow: 1  }}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.formTitle}>Form</Text>
                <Text style={styles.formSubtitle}>
                    Help us understand your profile to create personalized recommendations
                </Text>
            </View>

            {/* Row 1: Age & Height */}
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

            {/* Row 2: Weight & Gender */}
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Weight (kg)</Text>
                  <TextInput style={styles.input} placeholder="70" keyboardType="numeric" />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowGenderDD(true)}>
                  <Text style={styles.dropdownButtonText}>
                    {formData.gender || 'Select Gender'}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Activity Level */}
            <View style={styles.fullRow}>
              <View style={styles.inputGroup2}>
                <Text style={styles.label}>Activity Level</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowActivityLevelDD(true)}>
                  <Text style={styles.dropdownButtonText}>
                    {formData.activityLevel || 'Select Activity Level'}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Sport */}
            <View style={styles.fullRow}>
              <View style={styles.inputGroup2}>
                <Text style={styles.label}>Sport/Activity</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowSportDD(true)}>
                  <Text style={styles.dropdownButtonText}>
                    {formData.sport || 'Select Sport'}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Goal */}
            <View style={styles.fullRow}>
              <View style={styles.inputGroup2}>
                <Text style={styles.label}>Goal</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowGoalDD(true)}>
                  <Text style={styles.dropdownButtonText}>
                    {formData.goal || 'Select Goal'}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Diet Types */}
            <View style={styles.fullRow}>
              <View style={styles.inputGroup2}>
                <Text style={styles.label}>Diet Type</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowDietDD(true)}>
                  <Text style={styles.dropdownButtonText}>
                    {formData.dietaryType || 'Select Diet Type'}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>
            

        </ScrollView>

{/* ======================================================================================================================== */}

        {/* Modal Gender */}
        <Modal visible={showGenderDD} transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                {genderList.map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={styles.dropdownOption}
                    onPress={() => {
                      setFormData((prev) => ({ ...prev, gender: g }));
                      setShowGenderDD(false);
                    }}
                  >
                    <Text style={styles.dropdownOptionText}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowGenderDD(false)}
              >
                <Text style={{ textAlign: 'center', color: '#007bff' }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        {/* Modal Activity Level */}
        <Modal visible={showActivityLevelDD} transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                {activityLevelList.map((activity) => (
                  <TouchableOpacity
                    key={activity}
                    style={styles.dropdownOption}
                    onPress={() => {
                      setFormData((prev) => ({ ...prev, activityLevel: activity }));
                      setShowActivityLevelDD(false);
                    }}
                  >
                    <Text style={styles.dropdownOptionText}>{activity}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowActivityLevelDD(false)}
              >
                <Text style={{ textAlign: 'center', color: '#007bff' }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Sport */}
        <Modal visible={showSportDD} transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                {sportList.map((sp) => (
                  <TouchableOpacity
                    key={sp}
                    style={styles.dropdownOption}
                    onPress={() => {
                      setFormData((prev) => ({ ...prev, sport: sp}));
                      setShowSportDD(false);
                    }}
                  >
                    <Text style={styles.dropdownOptionText}>{sp}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowSportDD(false)}
              >
                <Text style={{ textAlign: 'center', color: '#007bff' }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Goal */}
        <Modal visible={showGoalDD} transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                {goalList.map((goal) => (
                  <TouchableOpacity
                    key={goal}
                    style={styles.dropdownOption}
                    onPress={() => {
                      setFormData((prev) => ({ ...prev, goal: goal}));
                      setShowGoalDD(false);
                    }}
                  >
                    <Text style={styles.dropdownOptionText}>{goal}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowGoalDD(false)}
              >
                <Text style={{ textAlign: 'center', color: '#007bff' }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Diet */}
        <Modal visible={showDietDD} transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                {dietTypeList.map((diet) => (
                  <TouchableOpacity
                    key={diet}
                    style={styles.dropdownOption}
                    onPress={() => {
                      setFormData((prev) => ({ ...prev, dietaryType: diet}));
                      setShowDietDD(false);
                    }}
                  >
                    <Text style={styles.dropdownOptionText}>{diet}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowDietDD(false)}
              >
                <Text style={{ textAlign: 'center', color: '#007bff' }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  fullRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  inputGroup: {
    width: '48%',
  },
  inputGroup2: {
    width: '100%',
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
    padding: 12,
    height: 48,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    maxHeight: '60%',
  },
  modalCloseButton: {
    marginTop: 10,
  },  
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    height: 48,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  dropdownOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#333',
  },
});
