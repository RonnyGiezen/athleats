import React, { Component } from "react";
import { View } from "react-native";
import { Registration } from "../components/Registration";
import { Login } from "../components/Login";

import { TextButton } from "../components/account.styles";

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true,
    };

    this.whichForm = this.whichForm.bind(this);
    this.authSwitch = this.authSwitch.bind(this);
  }

  authSwitch() {
    this.setState({
      showLogin: !this.state.showLogin,
    });
  }

  whichForm() {
    if (!this.state.showLogin) {
      return <Registration authSwitch={this.authSwitch} />;
    } else {
      return <Login newJWT={this.props.token} />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.whichForm()}
        <TextButton onPress={this.authSwitch}>
          {!this.state.showLogin
            ? "Already have an account? Log in!"
            : "Don't have an account? Register!"}
        </TextButton>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
