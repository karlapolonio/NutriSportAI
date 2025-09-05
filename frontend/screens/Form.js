import { Text, TextInput, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Modal, Alert, Button } from 'react-native';
import { useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    gender: '',
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

  const allergyOptions = [ 'Nuts', 'Dairy', 'Gluten', 'Shellfish', 'Soy', 'Eggs', 'Fish', 'Sesame'];

  const toggleAllergy = (allergy) => {
    setFormData(prev => {
      let newAllergies = [...prev.allergies];
      if (prev.allergies.includes(allergy)) {
        newAllergies = newAllergies.filter(item => item !== allergy);
      } else {
        newAllergies.push(allergy);
      }
      return { ...prev, allergies: newAllergies };
    });
  };

  const handleSubmit = () => {
    const emptyFields = [];
    const numericFields = [];

    // Check empty fields (except allergies)
    for (const key in formData) {
      if (key !== 'allergies' && !formData[key]) {
        emptyFields.push(key);
      }
    }

    // Check if age, height, weight are numeric
    ['age', 'height', 'weight'].forEach((field) => {
      if (formData[field] && isNaN(Number(formData[field]))) {
        numericFields.push(field);
      }
    });

    if (emptyFields.length > 0 || numericFields.length > 0) {
      let msg = '';
      if (emptyFields.length > 0) {
        msg += `Please fill out: ${emptyFields.join(', ')}.\n`;
      }
      if (numericFields.length > 0) {
        msg += `These fields must be numeric: ${numericFields.join(', ')}.`;
      }
      Alert.alert('Form Error', msg);
    } else {
      Alert.alert('Form Submitted', JSON.stringify(formData, null, 2));
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
      style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}
    >
        <ScrollView contentContainerStyle={{ flexGrow: 1  }} showsVerticalScrollIndicator={false}>
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
                  <TextInput
                    style={styles.input}
                    placeholder="25"
                    keyboardType="numeric"
                    value={formData.age}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, age: text }))}
                  />
              </View>
              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Height (cm)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="175"
                    keyboardType="numeric"
                    value={formData.height}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, height: text }))}
                  />
              </View>
            </View>

            {/* Row 2: Weight & Gender */}
            <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Weight (kg)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="70"
                    keyboardType="numeric"
                    value={formData.weight}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, weight: text }))}
                  />
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

            {/* Allergies Checkboxes */}
            <View style={styles.fullRow}>
              <View style={styles.inputGroup2}>
                <Text style={styles.label}>Food Allergies/Intolerances (if any):</Text>
                <View style={styles.checkboxContainer}>
                  <View style={styles.checkboxGrid}>
                    {allergyOptions.map((allergy) => (
                      <TouchableOpacity
                        key={allergy}
                        style={styles.checkboxRow}
                        onPress={() => toggleAllergy(allergy)}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            formData.allergies.includes(allergy) && styles.checkboxChecked
                          ]}
                        >
                          {formData.allergies.includes(allergy) && (
                            <Text style={styles.checkmark}>✓</Text>
                          )}
                        </View>
                        <Text style={styles.checkboxLabel}>{allergy}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <View style={{ marginVertical: 20 }}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>

{/* ================================================================================================================================================================ */}

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
    marginBottom: 25,
  },
  fullRow: {
    width: '100%',
    marginBottom: 25,
  },
  inputGroup: {
    width: '48%',
  },
  inputGroup2: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
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
    fontSize: 14,
    color: '#666',
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
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#333',
  },
  checkboxContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#01070cff',
    paddingVertical: 14,
    borderRadius: 7,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
