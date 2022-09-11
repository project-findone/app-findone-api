import joi from 'joi'

export const updateUserSchema = joi.object({
  name: joi.string().alphanum().max(64),
  lastname: joi.string().alphanum().max(64),
  birthDate: joi.date(),
  gender: joi.string(),
  email: joi.string(),
  password: joi.string(),
  phoneNumber: joi.string(),
  personCEP: joi.string(),
  stateID: joi.number(),
  city: joi.string(),
  score: joi.number(),
  personBiografy: joi.string(),
  personImage: joi.string()
})
