import joi from 'joi'

export const updateUserSchema = joi.object({
  name: joi.string().max(64),
  lastname: joi.string().max(64),
  birthDate: joi.string(),
  gender: joi.string(),
  email: joi.string(),
  password: joi.string(),
  phoneNumber: joi.string(),
  personCEP: joi.string(),
  state: joi.string(),
  city: joi.string(),
  score: joi.number(),
  personBiografy: joi.string(),
  personImage: joi.string()
})
