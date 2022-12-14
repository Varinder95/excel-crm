const { model, Schema } = require('mongoose');

const uploadsSchema = new Schema({
    UploadName: { type: String },
    FileName: { type: String, unique: true },
    NoOfEntries: { type: String },
    UploadedBy: { type: String },
},
{
  timestamps: true
});

module.exports = model('Uploads', uploadsSchema);