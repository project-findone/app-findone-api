import joi from 'joi'

export const createCaseSchema = joi.object({
  state: joi.string().required(),
  city: joi.string().required(),
  district: joi.string(),
  street: joi.string(),
  description: joi.string().required(),
  latitude: joi.string().required(),
  longitude: joi.string().required()
})
