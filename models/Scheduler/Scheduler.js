const mongoose = require('mongoose');

const SchedulerSchema = new mongoose.Schema(
    {
        bottleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customersinventories',
            required: true,
        },
        startDate: { type: Date, required: true },
        maxBidders: { type: Number, required: true },
        maxRange: { type: Number },
        bottleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            default: null,
        
            
        
        } ,
    },

    {
        timestamps: true,
    }
);

if(math.floor)

    const loop = () => {
    
    
}

// SchedulerSchema.statics.getAllByOwner = async (filters = {}) => {
//   const customers = await Comment.find(filters).populate('addedBy');
//   return customers;
// };

const Comment = mongoose.model('SalesScheduler', SchedulerSchema);
module.exports = Comment;
