import * as Yup from 'yup'

export const createRelationshipValidator = async (req, res, next) => {
    console.log(req.body)
    try {
        const Schema = Yup.object().shape({
            cpf1: Yup.number()
                .test(
                    'len',
                    'Cpf1 must be exactly 11 numbers',
                    (value) => value.toString().length === 11
                )
                .test(
                    'cpf-match',
                    'Cpf1 cannot be equal cpf2',
                    function (value) {
                        return this.parent.cpf2 !== value
                    }
                )
                .required(),
            cpf2: Yup.number()
                .test(
                    'len',
                    'Cpf2 must be exactly 11 numbers',
                    (value) => value.toString().length === 11
                )
                .required(),
        })

        await Schema.validate(req.body, { abortEarly: false })

        return next()
    } catch (e) {
        return res.status(400).json({
            error: e.errors,
        })
    }
}
