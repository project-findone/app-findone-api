import joi from 'joi'

export const createDisappearedSchema = joi.object({
  name: joi.string().alphanum().max(64).required(),
  lastname: joi.string().alphanum().max(64).required(),
  age: joi.number(),
  birthDate: joi.date(),
  personCPF: joi.string(),
  gender: joi.string().required(),
  personCEP: joi.string().required(),
  stateID: joi.number().required(),
  city: joi.string().required(),
  ownerID: joi.number().required(),
  personDeficiency: joi.string(),
  personKinship: joi.string().required(),
  personImage: joi.string(),
  characteristics: joi.string().required()
})
