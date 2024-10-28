import React from "react";
import { useGoogleLogin } from "react-use-googlelogin";

const GoogleAuthContext=React.createContext();

export const GoogleAuthProvider = ({Children}) => {
    const googleAuth = useGoogleLogin({
        clientId:
            '137217508049-o22mgm7kg0qms4ibp7219ig99ott61ib.apps.googleusercontent.com',
        isSignedIn:true,
    });

    return(
        <GoogleAuthContext.Provider value={googleAuth}>
            {Children}
        </GoogleAuthContext.Provider>
    );
};

export const useGoogleAuth = () =>React.useContext(GoogleAuthContext);