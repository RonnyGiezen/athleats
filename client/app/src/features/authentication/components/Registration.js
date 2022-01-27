import React, { Component } from "react";
import authService from "../../../services/authentication/auth.service";

import { ActivityIndicator, Colors } from "react-native-paper";

import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      inputError: "",
      error: "",
      loading: false,
    };

    this.registerUser = this.registerUser.bind(this);
    this.onRegistrationFail = this.onRegistrationFail.bind(this);
  }

  registerUser() {
    const { username, email, password } = this.state;

    this.setState({ error: "", loading: true });

    authService
      .signup(username, email, password)
      .then((response) => {
        if (response.status === 226) {
          this.onRegistrationFail("Email already in use")
        } else {
          this.props.authSwitch();
        }
      })
      .catch((error) => {
        this.onRegistrationFail("Registration Failed");
      });
  }

  validateEmail(email){
    this.setState({email});
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    if(!expression.test(String(email).toLowerCase())){
      this.setState({inputError: "Email incorrectly formatted"})
    } else {
      this.setState({inputError: ''})
    }
  }

  onRegistrationFail(message) {
    this.setState({
      error: message,
      loading: false,
    });
  }

  shouldDisable(){
    return this.state.inputError.length>0
        || this.state.email.length===0
        || this.state.password.length===0
        || this.state.username.length===0
        || this.state.password_confirmation.length===0;
  }

  render() {
    const { username, email, password, password_confirmation, error, inputError, loading } =
      this.state;

    return (
      <AccountBackground>
        <AccountCover />
        <Title>AthlEats</Title>
        <AccountContainer>
          <AuthInput
            label='Username'
            value={username}
            textContentType='username'
            autoCapitalize='none'
            onChangeText={(username) => this.setState({ username })}
          />
          <Spacer size='large'>
            <AuthInput
              label='E-mail'
              value={email}
              textContentType='emailAddress'
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={(email) => this.validateEmail(email)}
            />
          </Spacer>
          <Spacer size='large'>
            <AuthInput
              label='Password'
              value={password}
              textContentType='password'
              secureTextEntry
              autoCapitalize='none'
              onChangeText={(password) => this.setState({ password })}
            />
          </Spacer>
          <Spacer size='large'>
            <AuthInput
              label='Confirm Password'
              value={password_confirmation}
              textContentType='password'
              secureTextEntry
              autoCapitalize='none'
              onChangeText={(password_confirmation) => {
                this.setState({ password_confirmation });
                if (password !== password_confirmation) {
                  this.setState({ error: "Passwords must be the same" });
                } else {
                  this.setState({ error: "" });
                }
              }}
            />
          </Spacer>

          <ErrorContainer size='large'>
            <Text variant='error'>{error}</Text>
            <Text variant='error'>{inputError}</Text>
          </ErrorContainer>

          <Spacer size='large'>
            {!loading ? (
              <AuthButton
                icon='email'
                mode='contained'
                onPress={this.registerUser}
                disabled={this.shouldDisable()}
              >
                Register
              </AuthButton>
            ) : (
              <ActivityIndicator animating={true} color={Colors.blue300} />
            )}
          </Spacer>
        </AccountContainer>
        <Spacer size='large'></Spacer>
      </AccountBackground>
    );
  }
}

export { Registration };
