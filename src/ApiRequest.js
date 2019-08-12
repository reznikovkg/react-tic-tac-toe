import axios from 'axios';

axios.defaults.withCredentials = true;
const ApiRequest = (type, url, params = null, errorView = false) => {

    function errorHand(error, errorViewHand = false) {
        console.log(errorViewHand)
        console.log('error.response = ', error.response ? error.response : undefined);

        if (error.response.data.message) {
            if (!errorViewHand) {
                alert(error.response.data.message);
            }
            return error.response.data.message;
        } else {
            if (error.response.statusText) {

                if (!errorViewHand) {
                    alert(error.response.statusText);
                }
                return error.response.statusText;
            }

            if (!errorViewHand) {
                alert('ERROR! Please, reload app');
            }
            return error.toString();
        }
    }

    return new Promise((resolve, reject) => {

        switch (type) {
            case 'GET':
                axios.get(
                    url,
                    { params }
                ).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(errorHand(error, errorView));
                });
                break;
            case 'POST':
                axios.post(
                    url,
                    params
                ).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(errorHand(error, errorView));
                });
                break;

            case 'PUT':
                axios.put(
                    url,
                    params
                ).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(errorHand(error));
                });
                break;
            case 'DELETE':
                axios.delete(
                    url,
                    params
                ).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(errorHand(error));
                });
                break;
            default:
                break
        }
    });
};

export default ApiRequest;