/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { result } from '../models/result';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * ランダムに犬の写真がくる
     *
     * @returns result pet response
     * @throws ApiError
     */
    public static getRandom(): CancelablePromise<result> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/random',
        });
    }

}
