import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

type Task = {
  text: string;
  status: 'pending' | 'completed';
};

const TaskScreen: React.FC<{filter: 'all' | 'pending' | 'completed'}> = ({
  filter,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [status, setStatus] = useState<'pending' | 'completed'>('pending');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    loadTasks();
  }, [tasks]);

  const saveTasks = async (newTasks: Task[]) => {
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  };

  const addTask = () => {
    if (!taskText.trim()) return;
    let updatedTasks = [...tasks];
    if (editIndex !== null) {
      updatedTasks[editIndex] = {text: taskText, status};
      setEditIndex(null);
      Toast.show({
        type: 'success',
        text1: 'Task Updated!',
      });
    } else {
      updatedTasks.push({text: taskText, status});
      Toast.show({
        type: 'success',
        text1: 'Task Added!',
      });
    }
    saveTasks(updatedTasks);
    setTaskText('');
    setStatus('pending');
    setModalVisible(false);
  };

  const deleteTask = async (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    Toast.show({
      type: 'error',
      text1: 'Task Deleted!',
    });
  };

  const editTask = (index: number) => {
    setTaskText(tasks[index].text);
    setStatus(tasks[index].status);
    setEditIndex(index);
    setModalVisible(true);
  };

  const filteredTasks =
    filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.taskItem}>
            <Text>
              {item.text} - {item.status}
            </Text>
            <View style={styles.taskActions}>
              <TouchableOpacity onPress={() => editTask(index)}>
                <Icon name="pencil" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(index)}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}>
        <Icon name="plus" size={25} color="white" />
      </TouchableOpacity>

      {/* Modal with Transparent Background */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TextInput
              placeholder="Task"
              value={taskText}
              onChangeText={setTaskText}
              style={styles.input}
            />
            <Picker
              selectedValue={status}
              onValueChange={itemValue => setStatus(itemValue)}
              style={{
                width: '100%',
                height: 60,
                backgroundColor: 'black', // Ensures visibility
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
              }}
              itemStyle={{color: 'black'}}>
              <Picker.Item label="Pending" value="pending" />
              <Picker.Item label="Completed" value="completed" />
            </Picker>
            {/* Grouped Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={addTask} style={styles.addButton}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const App: React.FC = () => (
  <>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="All Tasks"
        screenOptions={{
          tabBarActiveTintColor: 'black',
        }}>
        <Tab.Screen
          name="All Tasks"
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="tasks" size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}>
          {() => <TaskScreen filter="all" />}
        </Tab.Screen>
        <Tab.Screen
          name="Pending"
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="clock-o" size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}>
          {() => <TaskScreen filter="pending" />}
        </Tab.Screen>
        <Tab.Screen
          name="Completed"
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="check-circle" size={size} color={color} />
            ),
            headerTitleAlign: 'center',
          }}>
          {() => <TaskScreen filter="completed" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
    <Toast />
  </>
);

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
  },
  taskActions: {flexDirection: 'row', gap: 10},
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  input: {borderWidth: 1, padding: 10, marginBottom: 10},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    flex: 1,
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    flex: 1,
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
