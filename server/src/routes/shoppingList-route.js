'use strict';

const express = require('express');
const router = express.Router();
const { body, param, matchedData } = require('express-validator');

const { validateRequest } = require('../middleware/validate-request');
const { checkJwt } = require('../middleware/authentication');

const { isValidMongoId } = require('../utils/helpers');

router.post(
  '/shopping-list',
  checkJwt(),
  body('name').not().isEmpty().trim().escape().isLength({ min: 4, max: 255 }),
  body('allowedUsers.*')
    .optional({ nullable: true })
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const queryData = matchedData(req, { locations: ['body'] });
      res.status(201).send(queryData);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/shopping-list/:shoppingListId/add-user',
  checkJwt('checkIsOwnerOrAdmin'),
  param('shoppingListId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('userId')
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
      const response = matchedData(req, { locations: ['body'] });
      if (response) res.status(201).send(response, shoppingListId);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/shopping-lists', checkJwt('isAdmin'), async (req, res, next) => {
  try {
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.get(
  '/shopping-list/:userId',
  checkJwt('isOwnerOrAdmin'),
  param('userId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      res.status(200).send(userId);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/shopping-list/:shoppingListId',
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

router.patch(
  '/shopping-list/:shoppingListId',
  checkJwt('isOwnerOrAdmin'),
  param('shoppingListId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  param('userId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('name').isString().trim().escape().isLength({ min: 4, max: 255 }),
  body('allowedUsers.*')
    .optional({ nullable: true })
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { shoppingListId, userId } = req.params;
      const bodyData = matchedData(req, { locations: ['body'] });

      res.status(201).send(bodyData, shoppingListId, userId);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/shopping-list/:shoppingListId/remove-user',
  checkJwt('isOwnerOrAdmin'),
  param('shoppingListId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  body('allowedUserId')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { shoppingListId } = req.params;
      const bodyData = matchedData(req, { locations: ['body'] });

      res.status(201).send(bodyData, shoppingListId);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/shopping-list/:shoppingListId',
  checkJwt('isOwnerOrAdmin'),
  param('shoppingListId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  param('userId')
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .custom((value) => isValidMongoId(value)),
  validateRequest,
  async (req, res, next) => {
    try {
      const { shoppingListId, userId } = req.params;
      res.status(201).send(shoppingListId, userId);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = {
  shoppingListRoute: router,
};
