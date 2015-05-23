"use strict";

// Need it for testing

var chai = require('chai');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
global.expect = chai.expect;
global.sinon = require('sinon');


global.window = require('../test/mocks/window');
global.window.google = require('../test/mocks/google-maps');
global.window.mapTools = require('index');

