export default class AuthenticationService {

    async getToken(username, password) {
        let response;
        const url = 'http://127.0.0.1:8081/api/login_user';
        try {
            response = await fetch(url, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
        } catch (error) {
            throw new Error(`Cannot validate user: ${error}`);
        }

        if (!response.ok) {
            throw new Error(`ERROR:${response.status}${response.statusText}`);
        }

        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error(`Cannot validate user: ${error}`);
        }

        // Comprueba si el data es correcto
        if (!data.ok) {
            throw new Error(`Cannot validate user: ${data.message}`);
        }

        return data;

    }

    decodeToken(token) {
        const parseJwt = token => {
            try {
                return JSON.parse(atob(token.split('.')[1]));
            } catch (error) {
                throw new Error(`Problem decoding token "${token}": ${error.message}.`);
            }
        }
        const tokenDecodificado = parseJwt(token);
        return tokenDecodificado;
    }

}
