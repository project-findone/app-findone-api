import joi from 'joi'

export const becomeLostValidationSchema = joi.object({
  name: joi.string().alphanum().max(64).required(),
  lastname: joi.string().alphanum().max(64).required(),
  age: joi.number().required(),
  birthDate: joi.date().required(),
  personCPF: joi.string().required(),
  gender: joi.string().required(),
  personCEP: joi.string().required(),
  state: joi.string().required(),
  city: joi.string().required(),
  personDeficiency: joi.string().required(),
  description: joi.string().required()
})
