import React from 'react';

export default React.createContext({
    token: null,
    username: null,
    login: (token, username, tokenExpiration) => {},
    logout: () => {}
});