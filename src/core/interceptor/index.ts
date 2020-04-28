import BASE_URL from '../config/api';

const fetchAPI = (path, options) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
        ...options,
    };

    fetch(`${BASE_URL}${path}`, requestOptions)
        .then(async (response) => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return Promise.resolve(data);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

export default fetchAPI;
