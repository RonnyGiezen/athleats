import React, { useContext } from "react";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { AuthContext } from "../../../services/authentication/auth.context";
import { AuthButton } from "../../authentication/components/account.styles";

export const SettingsScreen = () => {
  const { refreshToken } = useContext(AuthContext);

  const logout = () => {
    console.log("clicked logout");
    refreshToken(null);
  };

  return (
    <SafeArea>
      <AuthButton icon='account-arrow-left' mode='contained' onPress={logout}>
        Logout
      </AuthButton>
    </SafeArea>
  );
};
