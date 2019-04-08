import * as publicFunctions from './server-utilities.js';

// Expose public functions
global.doGet = publicFunctions.doGet;
global.fetchPrice = publicFunctions.fetchPrice;
