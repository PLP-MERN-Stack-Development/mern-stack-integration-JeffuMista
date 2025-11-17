const Joi = require("joi");

exports.createCategorySchema = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().max(200).optional(),
});
