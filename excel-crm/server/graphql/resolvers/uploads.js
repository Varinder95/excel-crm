const Uploads = require('../../models/Uploads');
const { ApolloError } = require('apollo-server-errors');


module.exports = {
    Mutation: {
        async saveUploads(_, {uploadsInput: { UploadName, FileName, NoOfEntries, UploadedBy } }) {
            // check if Uploads exist
            const oldUploads =  await Uploads.findOne({ FileName });

            // throw Uploads exist error
            if (oldUploads) {
                throw new ApolloError('Uploads Exist', 'Uploads_ALREADY_EXISTS');
            }

            //build mongo model
            const newUploads = new Uploads ({
                UploadName: UploadName,
                FileName: FileName,
                NoOfEntries: NoOfEntries,
                UploadedBy: UploadedBy

            });
            // save Uploads in mongo
            const res = await newUploads.save();
            return {
                id: res.id,
                ...res._doc
            };
        }
    },
    Query: {
        getUploads: async () => { 
            return await Uploads.find()
        },
        getSingleUpload: async (_, {FileName}) => {
            const uploads = Uploads.findOne({ FileName })
            if (!uploads) {
                throw new Error("Uploads Doesn't Exist")
            }
            else {
                return uploads
            }
        }
    },
}