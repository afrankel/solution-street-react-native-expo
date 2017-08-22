import React from 'react';
import { Alert, StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { DocumentPicker } from 'expo';
import t from 'tcomb-form-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Form = t.form.Form;

const Person = t.struct({
  fullName: t.String,              // a required string
  emailAddress: t.String,  // an required string
  tellUsAboutYourself: t.maybe(t.String)  // an optional string
});

const options = {}; // optional rendering options (see documentation)

export default class ApplyScreen extends React.Component {
  static navigationOptions = {
    title: 'Apply',
  };

  constructor(props) {
    super(props);
    this.state = {
      resumeUri: '',
      title: 'Select Resume'
    }
  };

  getInitialState() {
    return {
      options: options,
      value: null
    };
  };

  clearForm() {
      // clear content from all textbox
      this.setState({ value: null, title: 'Select Resume' });
  };

  onPress() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      if (this.state.resumeUri=='')
      {
        Alert.alert(
           'Please select your resume'
        );
      } else {
        console.log(value); // value here is an instance of Person
        console.log(this.state.resumeUri);
        Alert.alert(
           'Your resume has been submitted. We thank you!'
        );
        this.clearForm();
      }
    }
  };

  _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
		  //alert(result.uri);
      this.setState({
        resumeUri: result.uri,
        value: this.refs.form.getValue(),
        title: 'Resume Selected, size: (' + result.size + ' bytes)'
      });
      console.log(this.state.resumeUri);
	}

  render() {
    return (
      <KeyboardAwareScrollView>
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={Person}
          value={this.state.value}
          options={options}
        />
        <Button
          title={this.state.title}
          onPress={this._pickDocument}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Apply for a Job</Text>
        </TouchableHighlight>
      </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
