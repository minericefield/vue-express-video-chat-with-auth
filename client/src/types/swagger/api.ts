/* tslint:disable */
/* eslint-disable */
/**
 * Api Definitions
 * Only for Api
 *
 * The version of the OpenAPI document: 0.1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface LoginRequest
 */
export interface LoginRequest {
    /**
     * 
     * @type {string}
     * @memberof LoginRequest
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof LoginRequest
     */
    password: string;
}
/**
 * 
 * @export
 * @interface RegistrationRequest
 */
export interface RegistrationRequest {
    /**
     * 
     * @type {string}
     * @memberof RegistrationRequest
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof RegistrationRequest
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof RegistrationRequest
     */
    password: string;
}
/**
 * 
 * @export
 * @interface UserResponse
 */
export interface UserResponse {
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    email: string;
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Check if your account is active
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAuthGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/auth`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Create your account
         * @param {RegistrationRequest} registrationRequest params to register account
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAuthPost: async (registrationRequest: RegistrationRequest, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'registrationRequest' is not null or undefined
            assertParamExists('apiAuthPost', 'registrationRequest', registrationRequest)
            const localVarPath = `/api/auth`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(registrationRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Login
         * @param {LoginRequest} loginRequest params to login
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAuthPut: async (loginRequest: LoginRequest, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'loginRequest' is not null or undefined
            assertParamExists('apiAuthPut', 'loginRequest', loginRequest)
            const localVarPath = `/api/auth`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(loginRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Check if your account is active
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiAuthGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiAuthGet(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Create your account
         * @param {RegistrationRequest} registrationRequest params to register account
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiAuthPost(registrationRequest: RegistrationRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiAuthPost(registrationRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Login
         * @param {LoginRequest} loginRequest params to login
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiAuthPut(loginRequest: LoginRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiAuthPut(loginRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @summary Check if your account is active
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAuthGet(options?: any): AxiosPromise<UserResponse> {
            return localVarFp.apiAuthGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Create your account
         * @param {RegistrationRequest} registrationRequest params to register account
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAuthPost(registrationRequest: RegistrationRequest, options?: any): AxiosPromise<void> {
            return localVarFp.apiAuthPost(registrationRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Login
         * @param {LoginRequest} loginRequest params to login
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiAuthPut(loginRequest: LoginRequest, options?: any): AxiosPromise<UserResponse> {
            return localVarFp.apiAuthPut(loginRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @summary Check if your account is active
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public apiAuthGet(options?: any) {
        return DefaultApiFp(this.configuration).apiAuthGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Create your account
     * @param {RegistrationRequest} registrationRequest params to register account
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public apiAuthPost(registrationRequest: RegistrationRequest, options?: any) {
        return DefaultApiFp(this.configuration).apiAuthPost(registrationRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Login
     * @param {LoginRequest} loginRequest params to login
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public apiAuthPut(loginRequest: LoginRequest, options?: any) {
        return DefaultApiFp(this.configuration).apiAuthPut(loginRequest, options).then((request) => request(this.axios, this.basePath));
    }
}


