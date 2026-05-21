import Joi from 'joi'

export const issueSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string(),
    priority: Joi.string().valid('high', 'low').required(),
    type: Joi.string().valid('Feature', 'Bug', 'Documentation').required(),
    completed: Joi.date().max('now')
})

export const updateIssueSchema = Joi.object({
    title: Joi.string().min(3).optional(),
    description: Joi.string().optional(),
    priority: Joi.string().valid('high', 'low').optional(),
    type: Joi.string().valid('Feature', 'Bug', 'Documentation').optional(),
    completed: Joi.date().max('now')
})

export const paginationSchema = Joi.object({
    page: Joi.number().positive().min(1).default(1),
    pageSize: Joi.number().min(1).max(50).default(10),
    total: Joi.number(),
    totalPages: Joi.number()
})

export const idParamSchema = Joi.number().positive()
