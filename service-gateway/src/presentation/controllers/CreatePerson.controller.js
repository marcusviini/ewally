export class CreatePersonController {
    constructor({ svCreatePerson }) {
        this.svCreatePerson = svCreatePerson
    }

    async handle(httpRequest) {
        try {
            const response = await this.svCreatePerson.execute(httpRequest.body)

            if (response.error) {
                return {
                    status: 400,

                    data: { error: response.error },
                }
            }

            return {
                status: 200,

                data: response.data,
            }
        } catch (error) {
            console.log(error)
            return {
                status: 500,

                data: 'Ocorreu um problema interno, tente novamente ou fale com o suporte',
            }
        }
    }
}
