import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icons


export default function App() {


  const [todo, setTodo] = useState("")
  const [todoList, setTodoList] = useState([]);

  const todoText = (e) => {
    setTodo(e);
  }

  const AddTodo = () => {
    if (todo === "") {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please enter a todo',
        button: 'close',
      })
    } else {
      setTodoList([...todoList, { todoText: todo, isChecked: false }]);
      setTodo("")
    }
  }

  const toggleCheck = (index) => {
    let newTodoList = [...todoList];
    newTodoList[index].isChecked = !newTodoList[index].isChecked;
    setTodoList(newTodoList);
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success 🎉',
      textBody: 'Task Completed',
      button: 'close',
    })
  }


  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <Text style={styles.heading}><Icon name="list-ul" size={25} color="black" /> Todo Application</Text>
        <View style={styles.flexForTodo}>
          <TextInput style={styles.textInput} value={todo} onChangeText={todoText} placeholder='Add your Todo' />
          <Button color={"#3c823c"} borderWidth={"none"} onPress={AddTodo} title='Add Todo' />
        </View>

        <FlatList
          style={styles.TodoFlatList}
          data={todoList}
          renderItem={({ item, index }) => (
            <View style={[styles.todoItem, item.isChecked && styles.checkedItem]}>
              <Pressable onPress={() => toggleCheck(index)} style={styles.checkBox}>
                {item.isChecked ? <Icon name="check-square-o" size={20} color="green" /> : <Icon name="square-o" size={20} color="gray" />}
              </Pressable>
              <Text style={[styles.todolist, item.isChecked && styles.checkedText]}>{item.todoText}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </AlertNotificationRoot>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 20,
  },
  flexForTodo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 20
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 2
  },
  TodoFlatList: {
    width: '100%',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 2,
    borderStyle: 'dashed',
  },
  checkedItem: {
    borderWidth: 1,
    borderColor: 'green',
    borderStyle: 'solid',
  },
  todolist: {
    fontSize: 18,
    marginLeft: 10

  },
  checkBox: {
    marginRight: 10
  },
  checkedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  heading: {
    fontSize: 30,
    paddingBottom: 30,
  }
});