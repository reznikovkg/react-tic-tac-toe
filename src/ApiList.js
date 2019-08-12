const domain = 'http://localhost:3000/';

const apiUrl = `${domain}api/v1`;

const ApiList = {
    login: `${apiUrl}/login`,
    logout: `${apiUrl}/logout`,
    me: `${apiUrl}/me`,
    todos: `${apiUrl}/todos`,
    users: `${apiUrl}/users`,
};

export default ApiList;
