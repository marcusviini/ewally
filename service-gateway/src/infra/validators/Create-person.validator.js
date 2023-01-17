import * as Yup from 'yup'

export const createPersonValidator = async (req, res, next) => {
    try {
        const Schema = Yup.object().shape({
            cpf: Yup.number()
                .test(
                    'len',
                    'Cpf must be exactly 11 numbers',
                    (value) => value.toString().length === 11
                )
                .required(),
            name: Yup.string().required(),
        })

        await Schema.validate(req.body, { abortEarly: false })

        return next()
    } catch (e) {
        return res.status(400).json({
            error: e.errors,
        })
    }
}
