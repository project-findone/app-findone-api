import joi from 'joi'

export const createDisappearedSchema = joi.object({
  name: joi.string().max(64).required(),
  lastname: joi.string().max(64).required(),
  age: joi.number(),
  birthDate: joi.string(),
  personCPF: joi.string(),
  gender: joi.string().required(),
  personCEP: joi.string().required(),
  state: joi.string().required(),
  city: joi.string().required(),
  personDeficiency: joi.string(),
  personKinship: joi.string().required(),
  personImage: joi.string(),
  description: joi.string().required()
})

export const createCaseSchema = joi.object({
  state: joi.string().required(),
  city: joi.string().required(),
  district: joi.string(),
  street: joi.string(),
  description: joi.string().required(),
  latitude: joi.string().required(),
  longitude: joi.string().required()
})
