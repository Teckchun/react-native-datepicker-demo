import React from 'react';
import {
   StyleSheet,
   Text,
   View,
   DatePickerAndroid,
   DatePickerIOS,
   Modal,
   TouchableHighlight,
   Button,
   Platform
  } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
    this.state ={
      modalVisible:false,
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    }
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onDateChange(date) {
    this.setState({
      date: date
    });
  }

  showDatePicker = async () => {
    try {
        const {action, year, month, day} = await DatePickerAndroid.open({
            date: new Date()
        });

        if (action !== DatePickerAndroid.dismissedAction) {
            var date = new Date(year, month, day);
            this.setState({date: date});
        }
    } catch ({code, message}) {
        console.log('Cannot open date picker', message);
        console.log('test');
    }
};




  render() {
    return (
      <View>

        <TouchableHighlight style={styles.buttonStyle} onPress={
          Platform.OS === 'android'?this.showDatePicker:
          ()=>{this.setModalVisible(true)}


      }>
        <Text style={{color:'white'}}>Show Datepicker</Text>
      </TouchableHighlight>
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
            <DatePickerIOS
            date={this.state.date}
            mode="date"
            onDateChange={(date) => this.onDateChange(date)}
          />
          <TouchableHighlight onPress={() => {
            this.setModalVisible(!this.state.modalVisible)
          }} style={styles.buttonStyle}>
            <Text style={{color:'white'}}>Hide Modal</Text>
          </TouchableHighlight>

          </Modal>
      <Text>{this.state.date.toString()}</Text>

      </View>


    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'blue'
}
});
