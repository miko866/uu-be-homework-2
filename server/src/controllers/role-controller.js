'use strict';

const Role = require('../models/role-model');

/**
 * Get one role depends on name or id
 * @param {String} id
 * @param {String} name
 * @returns {Object } role
 */
const getRole = async (id = undefined, name = undefined) => {
  if (name) return await Role.findOne({ name }).lean();
  else return await Role.findById(id).lean();
};

/**
 * Admins can take all roles
 * @returns {Array[Object]} Roles
 */
const getRoles = async () => {
  return await Role.find().lean();
};

module.exports = { getRole, getRoles };
