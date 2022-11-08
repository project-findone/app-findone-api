import joi from 'joi'

export const createContributionSchema = joi.object({
  sessionChatID: joi.string().required(),
  categoryID: joi.number().required(),
  description: joi.string().required()
})
