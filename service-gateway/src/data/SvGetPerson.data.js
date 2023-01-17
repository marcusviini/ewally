export class SvGetPerson {
    constructor({ clientService }) {
        this.clientService = clientService
    }

    async execute({ cpf }) {
        const response = await this.clientService.GetPerson({
            cpf,
        })

        if (response.error) {
            return { error: response.error }
        }

        return {
            data: response,
        }
    }
}
