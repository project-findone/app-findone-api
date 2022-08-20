import joi from 'joi'

export const userSchema = joi.object({
  name: joi.string().alphanum().max(64).required(),
  lastname: joi.string().alphanum().max(64).required(),
  birth_date: joi.date().required(),
  personCPF: joi.string().required(),
  gender: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  phone_number: joi.string().required(),
  personCEP: joi.string().required(),
  state_id: joi.number().required(),
  personType_id: joi.number().required(),
  city: joi.string().required(),
  score: joi.number(),
  person_biografy: joi.string(),
  person_image: joi.string()
})
