'use strict';

const User = require('../models/user-model');

const { DUMMY_ROLE } = require('./dummyRole');

const DUMMY_USER = [
  // adminPassword
  new User({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@gmail.com',
    encrypt_password:
      '2dc1e70234e738211cfb984338a4b56aece53f8e1cc4585419e69b545c9c6b1ab7859399fde1e81c9ff34d1dba5c461fedaa573a734e054650c8ed49bd5e66ef',
    roleId: DUMMY_ROLE[0],
    salt: 'ba1c23c5-875f-4d80-ac92-fcb90e6b7150',
  }),
  // adminPassword
  new User({
    firstName: 'Simple',
    lastName: 'User',
    email: 'supervisor@gmail.com',
    encrypt_password:
      '2dc1e70234e738211cfb984338a4b56aece53f8e1cc4585419e69b545c9c6b1ab7859399fde1e81c9ff34d1dba5c461fedaa573a734e054650c8ed49bd5e66ef',
    roleId: DUMMY_ROLE[1],
    salt: 'ba1c23c5-875f-4d80-ac92-fcb90e6b7150',
  }),
];

module.exports = {
  DUMMY_USER,
};
