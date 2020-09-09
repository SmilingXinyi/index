/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

import {Type, State} from './types';

export default interface HyperthymesiaInterface {

    /**
     * Send 'log' level logs
     * @param id - log id
     * @param t - log type
     * @param s - log state
     * @param data - data
     */
    log(id: string | number, t: Type, s: State, data: any): void;

    /**
     * Send 'warn' level logs
     * @param id - log id
     * @param t - log type
     * @param s - log state
     * @param data - data
     */
    warn(id: string | number, t: Type, s: State, data: any): void;

    /**
     * Send 'error' level logs
     * @param id - log id
     * @param t - log type
     * @param s - log state
     * @param data - data
     */
    error(id: string | number, t: Type, s: State, data: any): void;
}
