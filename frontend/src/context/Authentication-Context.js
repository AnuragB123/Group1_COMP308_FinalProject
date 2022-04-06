import React from 'react';

export default React.createContext({
    token: null,
    studentnumber: null,
    login: (token, studentId, tokenExpiration) => {},
    logout: () => {}
});