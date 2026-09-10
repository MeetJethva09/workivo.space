import mongoose, {Schema , model} from 'mongoose';
const productionSchema = new Schema({
    date: {
        type: String,
        required: true,
        default: () => new Date().toISOString().split('T')[0], // Default to today's date in YYYY-MM-DD format
    },
    craft : {
        type: Number,
        required: true,
    },
    white:  {
        type: Number,
        required: true,
    },
    rate : {
        type: Number,
        required: true, 
        default: 4.50
    },
    total : {
        type: Number,
        required: true,
    },
    amount : {
        type: Number,
        required: true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

})
const productionModel = model('Production', productionSchema);
export default productionModel;