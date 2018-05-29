import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDazEFipKTcwhJRNcf6oDnFQxbWic5aoEk",
  authDomain: "srv-mobile-4ac1c.firebaseapp.com",
  databaseURL: "https://srv-mobile-4ac1c.firebaseio.com",
  projectId: "srv-mobile-4ac1c",
  storageBucket: "srv-mobile-4ac1c.appspot.com",
  messagingSenderId: "521326358441"
};
const firebaseApp = firebase.initializeApp(config);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      text: ''
    }
  }

  async getData() {
    await firebaseApp.database().ref('SRV/todos').on('value', data => {
      users = []
      for (var x in data.val()) {
        users.push(data.val()[x])
        length = users.length-1
        console.log(users[length])
      }
      console.log(users)
      this.setState({ users: users })
    })
  }

  componentDidMount() {
    this.getData()
  }


  addTodo= async ()=>{ 
      await firebaseApp.database().ref('SRV/todos').push({
        todo:this.state.text
      })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Todo List</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />

        {this.state.users.map(data => (
          <Text>{data.todo}</Text>
        ))}

        <Button
         onPress={
            this.addTodo
          }
          title="Add"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
  },
});

export default App