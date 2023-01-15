import React from "react";
import { Appbar, DefaultTheme } from 'react-native-paper';
import { AppBarProps } from "./Types";

function AppBar({home, account, bottom}: AppBarProps ): JSX.Element {
    return (
        <Appbar safeAreaInsets={{ bottom }} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 80 + bottom, justifyContent: 'center' }}>
            <Appbar.Action icon={"home"} color={ home ? DefaultTheme.colors.primary : DefaultTheme.colors.onBackground} size={36} />
            <Appbar.Action icon={"account-settings"} color={ account ? DefaultTheme.colors.primary : DefaultTheme.colors.onBackground} size={36} />
        </Appbar>
    )
}

export default AppBar;