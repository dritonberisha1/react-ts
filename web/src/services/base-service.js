
const METHODS = {
    GET: 'GET'
}
class BaseService {

    /**
     * @param {string} options.method 
     * @param {string} options.headers 
     * @param {string} options.body 
     * @param {string} options.data
     * @param {string} options.rootPath 
     * @param {string} options.path 
     */
    _apiGet(options) {
        options.method = METHODS.GET;
        return this._makeRequest(options);
    }

    __validateOptions(options){
        if(!options.method || typeof options.method !== 'string') throw new Error('Method is a required string');
        if(options.rootPath && typeof options.rootPath !== 'string') throw new Error('rootPath is a required string');
        if(options.path && typeof options.path !== 'string') throw new Error('path is a required string');
        return;
    }

    _makeRequest(options) {
        this.__validateOptions(options);
        const request = {
            method: options.method || 'GET',
            headers: options.headers,
            body: options.body || options.data,
            mode: 'cors'
        };

        request.headers = new Headers();

        if (options.headers && options.headers.length) {
            options.headers.forEach(function (header) {
                let label = Object.getOwnPropertyNames(header)[0];
                request.headers.append(label, header[label])
            });
        }

        const url = options.rootPath + options.path;
        return fetch(url, request)
            .then((result) => {
                if (!result.ok) {
                    return new Promise((resolve, reject) => {
                        if (result.status === 403) {
                            return reject("Unauthorized");
                        }

                        result.json().then((json) => {
                            //console.log('ERROR RESPONSE', json);
                            var errorResponse = {
                                headers: {},
                                status: result.status,
                                message: json.message || '',
                                code: json.code
                            };
                            // Display the key/value pairs
                            for (var header of result.headers.entries()) {
                                errorResponse.headers[header[0]] = header[1];
                            }
                            if (json.errors && json.errors.length) {
                                errorResponse.message += json.errors.join(',');
                            }
                            reject(errorResponse);
                        }).catch(reject);
                    })
                }
                return result.json();
            })
    }
}

export default BaseService;