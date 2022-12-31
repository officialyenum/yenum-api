const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
    description: {
        type: String,
        required: true,
      },
    url: {
        type: String,
        required: true,
      },
    image_url: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
    },
},
{ 
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at' 
    }
});

module.exports = mongoose.model('Game', gameSchema);
