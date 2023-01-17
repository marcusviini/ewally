export class SvCleanDatabase {
    constructor({ clientService }) {
        this.clientService = clientService
    }

    async execute() {
        const response = await this.clientService.CleanDatabase({})

        if (response.error) {
            return { error: response.error }
        }

        return {
            data: response,
        }
    }
}
