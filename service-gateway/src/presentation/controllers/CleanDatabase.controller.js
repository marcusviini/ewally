export class CleanDatabaseController {
    constructor({ svCleanDatabase }) {
        this.svCleanDatabase = svCleanDatabase
    }

    async handle() {
        try {
            const response = await this.svCleanDatabase.execute()

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
