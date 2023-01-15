import React from "react";
import { Appbar, DefaultTheme } from 'react-native-paper';
import { AppBarProps } from "./Types";

function AppBar({page, bottom, setPage}: AppBarProps ): JSX.Element {
    return (
        <Appbar safeAreaInsets={{ bottom }} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 80 + bottom, justifyContent: 'center' }}>
            <Appbar.Action
              icon={"home"}
              color={ page === 'home' ? DefaultTheme.colors.primary : DefaultTheme.colors.onBackground}
              size={36}
              onPress={ page !== 'home' ? () => setPage('home') : undefined }
              accessibilityLanguage="en-us"
              accessibilityLabelledBy=""/>
            <Appbar.Action
              icon={"account-settings"}
              color={ page === 'account' ? DefaultTheme.colors.primary : DefaultTheme.colors.onBackground}
              size={36}
              onPress={ page !== 'account' ? () => setPage('account') : undefined }
              accessibilityLanguage="en-us"
              accessibilityLabelledBy=""/>
        </Appbar>
    )
}

export default AppBar;