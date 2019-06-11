import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import * as EmailValidator from "email-validator";
import { WaveIndicator } from "react-native-indicators";
import styles from "./style";
import { f } from "../../../config/config.js";

export default class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }
  render() {
    return (
      <ImageBackground
        source={require("../../images/landing.jpg")}
        style={{ width: "100%", height: "100%", flex: 1 }}
      >
        <View style={styles.firstContainer}>
          <ScrollView style={styles.scrollStyle}>
            <View style={styles.container2}>
              <Image
                source={require("../../images/logo.png")}
                style={styles.logo}
              />
              <WaveIndicator color="black" />
            </View>

            <KeyboardAvoidingView behavior="position">
              <View style={styles.containerNew}>
                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  style={styles.input}
                  onChangeText={text => this.setState({ email: text })}
                />
                <TouchableOpacity
                  onPress={this.resetPassword}
                  style={styles.loginTouchableOpacity}
                >
                  <Text style={styles.loginText}>Reset Password</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <View style={styles.container4}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.text}>Go Back To Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }

  resetPassword = () => {
    if (EmailValidator.validate(this.state.email) === true) {
      var that = this;
      f.auth()
        .sendPasswordResetEmail(this.state.email)
        .then(function() {
          alert("Please Check Your Email To Reset Your Password");
          let { navigate } = that.props.navigation;
          navigate("Login");
        })
        .catch(function(error) {
          alert(error);
        });
    } else {
      alert("Please enter A Valid Email");
    }
  };
}
