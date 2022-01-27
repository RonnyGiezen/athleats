import React, { Component } from "react";
import deviceStorage from "../../../services/authentication/deviceStorage";
import authService from "../../../services/authentication/auth.service";
import { LoadingContainer } from "../../../components/utils/LoadingContainer";

import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "./account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      inputError: '',
      error: "",
      loading: false,
    };

    this.loginUser = this.loginUser.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  loginUser() {
    const { email, password } = this.state;

    this.setState({ error: "", loading: true });

    authService
      .login(email, password)
      .then((response) => {
        deviceStorage.saveKey("id_token", response.data.token).then(() => {
          this.props.newJWT(response.data.token);
        });
      })
      .catch((error) => {
        this.onLoginFail();
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
  
  onLoginFail() {
    this.setState({
      error: "Login Failed",
      loading: false,
    });
  }

  shouldDisable(){
    return this.state.inputError.length>0
        || this.state.email.length===0
        || this.state.password.length===0;
  }

  render() {
    const { email, password, error, inputError, loading } = this.state;

    return (
      <AccountBackground>
        <AccountCover />
        <Title>AthlEats</Title>
        <AccountContainer>
          <AuthInput
            label='E-mail'
            value={email}
            textContentType='emailAddress'
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(email) => this.validateEmail(email)}
          />
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

          <ErrorContainer size='large'>
            <Text variant='error'>{error}</Text>
            <Text variant='error'>{inputError}</Text>
          </ErrorContainer>

          <Spacer size='large'>
            {!loading ? (
              <AuthButton onPress={this.loginUser} disabled={this.shouldDisable()}>Login</AuthButton>
            ) : (
              <LoadingContainer />
            )}
          </Spacer>
        </AccountContainer>
        <Spacer size='large'></Spacer>
      </AccountBackground>
    );
  }
}

export { Login };
