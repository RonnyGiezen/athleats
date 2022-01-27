import React from "react";
import {SafeArea} from "../../../components/utils/safe-area.component";

export const SpaceContainerComponent = ({children}) => {
    return (
        <SafeArea style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', marginTop: 0}}>
            {children}
        </SafeArea>
    );
}
