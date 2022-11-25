const { model, Schema } = require('mongoose');

const dataSchema = new Schema({
    Business: { type: String, unique: true },
    Address: { type: String },	
    Supplier: { type: String },
    Decision_Maker: { type: String },
    Telephone_1: { type: String },
    Telephone_2: { type: String },
    PC: { type: String },	
    MTC: { type: String },
    LLF: { type: String },
    MPRN: { type: String },
    MPAN: { type: String },
    EAC: { type: String },
    CED: { type: String },
});

module.exports = model('Data', dataSchema);