const Data = require('../../models/Data');
const { ApolloError } = require('apollo-server-errors');


module.exports = {
    Mutation: {
        async saveData(_, {dataInput: { Business ,Address, Supplier, Decision_Maker, Telephone_1, Telephone_2, PC, MTC, LLF, MPRN, MPAN, EAC, CED } }) {
            // check if data exist
            const oldData =  await Data.findOne({ Business });

            // throw Data exist error
            if (oldData) {
                throw new ApolloError('Data Exist', 'DATA_ALREADY_EXISTS');
            }

            //build mongo model
            const newData = new Data ({
                Business: Business,
                Address: Address,
                Supplier: Supplier,
                Decision_Maker: Decision_Maker,
                Telephone_1: Telephone_1,
                Telephone_2: Telephone_2,
                PC: PC,
                MTC: MTC,
                LLF: LLF,
                MPRN: MPRN,
                MPAN: MPAN,
                EAC: EAC,
                CED: CED

            });
            // save data in mongo
            const res = await newData.save();
            return {
                id: res.id,
                ...res._doc
            };
        }
    },
    Query: {
        getData: async () => { 
            return await Data.find()
        }
    },
}