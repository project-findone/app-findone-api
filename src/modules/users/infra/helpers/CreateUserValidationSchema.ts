import joi from 'joi'

export const createUserSchema = joi.object({
  name: joi.string().alphanum().max(64).required(),
  lastname: joi.string().alphanum().max(64).required(),
  birthDate: joi.date().required(),
  personCPF: joi.string().required(),
  gender: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  phoneNumber: joi.string().required(),
  personCEP: joi.string().required(),
  state: joi.string().required(),
  city: joi.string().required(),
  score: joi.number(),
  personBiografy: joi.string(),
  personImage: joi.string()
})
