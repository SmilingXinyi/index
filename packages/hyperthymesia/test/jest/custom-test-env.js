/**
 * @file test file - account sdk
 * Created by xinyi on 2019/11/27
 */

require('dotenv').config();

const NodeEnvironment = require('jest-environment-jsdom-sixteen');

class CustomEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
        this.docblockPragmas = context.docblockPragmas;
        this.global.process.title = 'Hyperthymesia';
    }
}

module.exports = CustomEnvironment;
