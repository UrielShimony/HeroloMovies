
const axios = require('axios');


class MockServer {

    get(url, params) {
        console.log('sending get to ', url);
        return axios.get(url, {
                params: params
            }
        ).then((response) => {
            console.log('response \n', response);
            return response;
        }).catch((err) => {
            console.log('error with get request : ' + err);
        })
    }

}

export default new MockServer()