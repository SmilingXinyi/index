/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

// import Fingerprint2, {Options} from 'fingerprintjs2';

// const gen = async (opts?: Options) => Fingerprint2
//     .getPromise(opts)
//     .then(components => components.map(component => component.value))
//     .then(values => Fingerprint2.x64hash128(values.join(''), 31));
//
// export const genFingerID = (opts?: Options): Promise<any> => new Promise(resolve => {
//     // @ts-ignore
//     if (window.requestIdleCallback) {
//         // @ts-ignore
//         window.requestIdleCallback(() => resolve(gen(opts)))
//     } else {
//         setTimeout(() => resolve(gen(opts)), 500)
//     }
// });

export const genRandomInt = (min: number, max: number): number => {
    const theMin = Math.ceil(min);
    const theMax = Math.floor(max);
    return Math.floor(Math.random() * (theMax - theMin)) + theMin;
};
