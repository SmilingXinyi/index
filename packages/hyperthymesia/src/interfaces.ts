/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

export default interface HyperthymesiaInterface {

    /**
     * Send 'log' level logs
     * @param id - log id
     * @param data - data
     */
    log(id: string | number, data: any): void;

    /**
     * Send 'warn' level logs
     * @param id - log id
     * @param data - data
     */
    warn(id: string | number, data: any): void;

    /**
     * Send 'error' level logs
     * @param id - log id
     * @param data - data
     */
    error(id: string | number, data: any): void;
}
