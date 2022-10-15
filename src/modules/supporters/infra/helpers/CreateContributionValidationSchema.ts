import joi from 'joi'

export const createContributionSchema = joi.object({
  sessionChatID: joi.number().required(),
  categoryID: joi.number().required(),
  description: joi.string().required()
})
