import 'dotenv/config'

import load from '../../main/pb/loader'

export const ClientService = load({
    serviceName: 'ClientService',

    address: process.env.GRPC_SERVICE,

    fileName: 'client',
})
