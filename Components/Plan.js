import React, { useState } from 'react';
import {View,Text,Button,TextInput,TouchableOpacity,StyleSheet,Modal,TouchableWithoutFeedback,FlatList,Dimensions,} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';  
import { collection, addDoc,getFirestore, getDocs } from 'firebase/firestore';
import { auth, firestore } from './firebaseConfig'; 

export default function AddPlanScreen() {
  const [pillsName, setPillsName] = useState('');
  const [amount, setAmount] = useState(1);
  const [duration, setDuration] = useState(1); 
  const [durationUnit, setDurationUnit] = useState('Day');
  const [selectedFoodPillsButton, setSelectedFoodPillsButton] = useState(null);
  const [isAmountModalVisible, setIsAmountModalVisible] = useState(false);
  const [isDurationModalVisible, setIsDurationModalVisible] = useState(false);
  const navigation = useNavigation();
  

  const Notif = () => {
    navigation.navigate('Notif');
  };
  
const addPlan = async () => {
  if (!pillsName || !selectedFoodPillsButton) {
    alert('Please fill out all required fields.');
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    alert('User is not authenticated.');
    return;
  }

  try {
    const planData = {
      pillsName,
      amount,
      duration,
      durationUnit,
      foodPillsButton: selectedFoodPillsButton,
      notifications,
      userId: user.uid,
    };

    console.log('Adding document with data:', planData);

    const docRef = await addDoc(collection(firestore, 'plans'), planData);
    console.log('Document written with ID:', docRef.id);

    navigation.navigate('Home');
  } catch (error) {
    console.error('Error adding document:', error);
    alert(`Error: ${error.message}`);
  }
};



  const renderNumberItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => setDuration(item)}
    >
      <Text
        style={[
          styles.dropdownItemText,
          duration === item && styles.selectedText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderUnitItem = (unit) => (
    <TouchableOpacity
      key={unit}
      style={styles.dropdownItem}
      onPress={() => setDurationUnit(unit)}
    >
      <Text
        style={[
          styles.dropdownItemText,
          durationUnit === unit && styles.selectedText,
        ]}
      >
        {duration === 1 ? unit : unit + 's'}
      </Text>
    </TouchableOpacity>
  );

  const renderAmountItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => setAmount(item)}
    >
      <Text
        style={[
          styles.dropdownItemText,
          item === amount && styles.selectedText,
        ]}
      >
        {item} {item === 1 ? 'Pill' : 'Pills'}
      </Text>
    </TouchableOpacity>
    
  );
  
    const [notifications, setNotifications] = useState([]);
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [period, setPeriod] = useState(0);
    const [editingNotificationId, setEditingNotificationId] = useState(null);

  
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = Array.from({ length: 60 }, (_, i) => i);
    const periods = ['AM', 'PM'];
  
    const addOrUpdateNotification = (time) => {
        if (editingNotificationId) {
          setNotifications(notifications.map(notification =>
            notification.id === editingNotificationId
              ? { ...notification, time }
              : notification
          ));
        } else {
          setNotifications([...notifications, { id: Date.now().toString(), time }]);
        }
        setEditingNotificationId(null); 
      };
    
    
      const removeNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
      };
      const handleConfirm = () => {
        const time = `${hours[hour]}:${minutes[minute] < 10 ? `0${minutes[minute]}` : minutes[minute]} ${periods[period]}`;
        if (editingNotificationId) {
          setNotifications(notifications.map(notification =>
            notification.id === editingNotificationId
              ? { ...notification, time }
              : notification
          ));
        } else {
          setNotifications([...notifications, { id: Date.now().toString(), time }]);
        }
        setEditingNotificationId(null);
        setIsTimePickerVisible(false);
      };
      const handleNotificationPress = (id, time) => {
        const [notificationHour, notificationMinute, notificationPeriod] = time.split(/[: ]/);
        setHour(hours.indexOf(parseInt(notificationHour)));
        setMinute(parseInt(notificationMinute));
        setPeriod(periods.indexOf(notificationPeriod));
        setEditingNotificationId(id);
        setIsTimePickerVisible(true);
      };
    
    
      const renderNotification = ({ item }) => (
        <Swipeable
          renderRightActions={() => (
            <View style={styles.deleteContainer}>
              <Text style={styles.deleteText}>Delete</Text>
            </View>
          )}
          onSwipeableRightOpen={() => removeNotification(item.id)}
        >
          <TouchableOpacity onPress={() => handleNotificationPress(item.id, item.time)}>
          <View style={styles.notificationBox}>
            <FontAwesome name="bell" size={20} color="#B0B0B0" style={styles.bellIcon} />
            <Text style={styles.notificationText}>{item.time}</Text>
          </View>
          </TouchableOpacity>
        </Swipeable>
      );
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Add Plan</Text>

      <Text style={styles.label}>Pills Name</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons name="medication" size={24} color="#AAAAAA" />
        <TextInput
          style={styles.input}
          placeholder="Pills Name"
          placeholderTextColor="#AAAAAA"
          value={pillsName}
          onChangeText={setPillsName}
        />
        <TouchableOpacity>
          <MaterialIcons name="qr-code-scanner" size={24} color="#FF6347" />
        </TouchableOpacity>
       </View>

      <Text style={styles.label}>Amount & How Long?</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => setIsAmountModalVisible(true)}
        >
          <MaterialIcons name="looks-one" size={24} color="#AAAAAA" />
          <Text style={styles.dropdownText}>
            {amount} {amount === 1 ? 'Pill' : 'Pills'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => setIsDurationModalVisible(true)}
        >
          <MaterialIcons name="event" size={24} color="#AAAAAA" />
          <Text style={styles.dropdownText}>
            {duration} {duration === 1 ? durationUnit : durationUnit + 's'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={isAmountModalVisible}
        animationType="slide"
        onRequestClose={() => setIsAmountModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsAmountModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={[...Array(10).keys()].map(i => i + 1)}
                renderItem={renderAmountItem}
                keyExtractor={item => item.toString()}
                style={styles.scrollableList}
              />
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setIsAmountModalVisible(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        transparent={true}
        visible={isDurationModalVisible}
        animationType="slide"
        onRequestClose={() => setIsDurationModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsDurationModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalRow}>
                <View style={styles.numberSection}>
                  <Text style={styles.sectionTitle}>Number Of Days</Text>
                  <FlatList
                    data={[...Array(30).keys()].map(i => i + 1)}
                    renderItem={renderNumberItem}
                    keyExtractor={item => item.toString()}
                    style={styles.scrollableList}
                  />
                </View>
                <View style={styles.unitSection}>
                  <Text style={styles.sectionTitle}>Select Unit</Text>
                  {['Day', 'Month'].map(renderUnitItem)}
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setIsDurationModalVisible(false)}
                style={styles.doneButton}
              >
                <Text style={styles.doneButtonText} onPress={Notif}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Text style={styles.label}>Food & Pills</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.iconButton, selectedFoodPillsButton === 'pre-meal' && styles.activeButton]}
          onPress={() => setSelectedFoodPillsButton('pre-meal')}
        >
          <View style={styles.iconWrapper}>
            <Ionicons name="ellipse" size={28} color="#FFFFFF" style={styles.icon} />
            <Ionicons name="restaurant" size={28} color="#FFFFFF" style={styles.icon} />
            <Ionicons name="restaurant-outline" size={28} color="#FFFFFF" style={styles.icon} />
          </View>
          <Text style={styles.iconLabel}>Pre-meal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, selectedFoodPillsButton === 'in-meal' && styles.activeButton]}
          onPress={() => setSelectedFoodPillsButton('in-meal')}
        >
          <View style={styles.iconWrapper}>
            <Ionicons name="restaurant" size={28} color="#FFFFFF" style={styles.icon} />
            <Ionicons name="ellipse" size={28} color="#FFFFFF" style={styles.icon} />
            <Ionicons name="restaurant-outline" size={28} color="#FFFFFF" style={styles.icon} />
          </View>
          <Text style={styles.iconLabel}>In-meal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, selectedFoodPillsButton === 'post-meal' && styles.activeButton]}
          onPress={() => setSelectedFoodPillsButton('post-meal')}
        >
          <View style={styles.iconWrapper}>
            <Ionicons name="restaurant" size={28} color="#FFFFFF" style={styles.icon} />
            <Ionicons name="restaurant-outline" size={28} color="#FFFFFF" style={styles.icon} />
            <Ionicons name="ellipse" size={28} color="#FFFFFF" style={styles.icon} />
          </View>
          <Text style={styles.iconLabel}>Post-Meal</Text>
        </TouchableOpacity>
      </View>

      <GestureHandlerRootView  >
      <View style={styles.notificationRow}>
        <Text style={styles.notificationLabel}>Notification</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsTimePickerVisible(true)}>
          <FontAwesome name="plus" size={25} color="#FF6347" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <Modal transparent visible={isTimePickerVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={hour}
                style={styles.picker}
                onValueChange={(itemValue) => setHour(itemValue)}
              >
                {hours.map((h, index) => (
                  <Picker.Item key={index} label={`${h}`} value={index} color='white' />
                ))}
              </Picker>
              <Picker
                selectedValue={minute}
                style={styles.picker}
                onValueChange={(itemValue) => setMinute(itemValue)}
              >
                {minutes.map((m, index) => (
                  <Picker.Item key={index} label={m < 10 ? `0${m}` : `${m}`} value={index} color='white' />
                ))}
              </Picker>
              <Picker
                selectedValue={period}
                style={styles.picker}
                onValueChange={(itemValue) => setPeriod(itemValue)}
              >
                {periods.map((p, index) => (
                  <Picker.Item key={index} label={p} value={index} color='white'/>
                ))}
              </Picker>
            </View>
            <View style={styles.modalButtons}>
              <Button title="Confirm" color="#1E90FF" onPress={handleConfirm} />
              <Button title="Cancel" color="#FF4500" onPress={() => setIsTimePickerVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>

      <TouchableOpacity style={styles.doneButton} onPress={addPlan}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdownContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: 10,
    marginRight: 8,
  },
  dropdownText: {
    color: '#FFFFFF',
    marginLeft: 10,
  },
  iconButton: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    alignItems: 'center',
    padding: 13,
    marginHorizontal: 4,
    justifyContent: 'center',
    flexDirection: 'column', 
    alignItems: 'center',
  },
  iconWrapper: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 5, 
  },
  icon: {
    marginHorizontal: 2, 
  },
  activeButton: {
    backgroundColor: '#FF6347',
  },
  inactiveButton: {
    backgroundColor: '#2C2C2C',
  },
  iconLabel: {
    color: '#FFFFFF',
    marginTop: 5,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    padding: 20,
  },
  modalRow: {
    flexDirection: 'row',
  },
  numberSection: {
    flex: 1,
  },
  unitSection: {
    flex: 1,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
  scrollableList: {
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    color: '#FFFFFF',
  },
  selectedText: {
    color:'#FF6347',
    fontWeight: 'bold',
  },
  centeredButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  list: {
    marginTop: 10,
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  notificationLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    
  },
  addButton: {
    borderRadius: 10,
    padding: 10,
  },
  list: {
    marginTop: 50,
     bottom:50,
  },
  notificationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2C2C2C', 
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 16,
    color: 'white', 
    marginLeft: 10,
  },
  bellIcon: {
    marginRight: 10,
  },
  deleteContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: '83%',
    borderRadius: 10,
    width: 100,
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  pickerOverlay: {
    backgroundColor: 'rgba(20, 24, 36, 0.8)',
    borderRadius: 30,
    padding: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  picker: {
    width: 100,
    height: 200,
    marginHorizontal: 5,
    color: '#FFF',
  },
  modalButtons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  doneButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    bottom: 40,
 
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
