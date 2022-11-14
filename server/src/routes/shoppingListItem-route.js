'use strict';

const express = require('express');
const router = express.Router();
const { body, param, matchedData, check } = require('express-validator');

const { validateRequest } = require('../middleware/validate-request');
const { checkJwt } = require('../middleware/authentication');

const { isValidMongoId } = require('../utils/helpers');

router.post(
  '/shopping-list/:shoppingListId/items',
  checkJwt('isAllowed'),
  param('shoppingListId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  check('items.*.name').not().isEmpty().trim().escape().isLength({ min: 4, max: 255 }),
  check('items.*.status').not().isEmpty().isBoolean(),
  validateRequest,
  async (req, res, next) => {
    try {
      const { shoppingListId } = req.params;
      const queryData = matchedData(req, { locations: ['body'] });
      res.status(201).send(queryData, shoppingListId);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/shopping-list/:shoppingListId/items',
  checkJwt('isAllowed'),
  param('shoppingListId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { shoppingListId } = req.params;
      res.status(200).send(shoppingListId);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/shopping-list/:shoppingListId/item/:itemId',
  checkJwt('isAllowed'),
  param('shoppingListId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  param('itemId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { shoppingListId, itemId } = req.params;
      res.status(200).send(shoppingListId, itemId);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  'shopping-list/:shoppingListId/item/:itemId',
  checkJwt('isAllowed'),
  param('shoppingListId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  param('itemId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('name').isString().trim().escape().isLength({ min: 4, max: 255 }).optional({ nullable: true }),
  body('status').isBoolean().optional({ nullable: true }),
  validateRequest,
  async (req, res, next) => {
    try {
      const { shoppingListId, itemId } = req.params;
      const bodyData = matchedData(req, { locations: ['body'] });
      res.status(201).send(bodyData, shoppingListId, itemId);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/shopping-list/:shoppingListId/items',
  checkJwt('isAllowed'),
  param('shoppingListId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('ids.*')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { shoppingListId } = req.params;
      const bodyData = matchedData(req, { locations: ['body'] });

        res.status(204).send(bodyData, shoppingListId);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = {
  shoppingListItemRoute: router,
};
