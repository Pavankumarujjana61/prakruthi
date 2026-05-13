import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  tripId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  vehicle: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vehicle',
    required: [true, 'Please assign a vehicle to the trip']
  },
  driver: {
    type: mongoose.Schema.ObjectId,
    ref: 'Driver',
    required: [true, 'Please assign a driver to the trip']
  },
  route: {
    from: {
      type: String,
      required: [true, 'Please add starting location'],
      trim: true
    },
    to: {
      type: String,
      required: [true, 'Please add destination'],
      trim: true
    }
  },
  distance: {
    type: Number,
    required: [true, 'Please add trip distance'],
    min: [0, 'Distance cannot be negative']
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Loading Done', 'Unloading Done', 'Completed', 'Cancelled'],
    default: 'Not Started'
  },
  startDate: {
    type: Date,
    required: [true, 'Please add start date']
  },
  endDate: {
    type: Date
  },
  actualStartTime: {
    type: Date
  },
  actualEndTime: {
    type: Date
  },
  estimatedDuration: {
    type: Number, // in hours
    min: 0
  },
  actualDuration: {
    type: Number, // in hours
    min: 0
  },
  cargo: {
    type: String,
    description: String,
    weight: Number, // in kg
    value: Number // in INR
  },
  fuelConsumed: {
    type: Number,
    min: 0
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
tripSchema.index({ tripId: 1 });
tripSchema.index({ status: 1 });
tripSchema.index({ startDate: -1 });
tripSchema.index({ vehicle: 1, startDate: -1 });
tripSchema.index({ driver: 1, startDate: -1 });

// Virtual for formatted route
tripSchema.virtual('formattedRoute').get(function() {
  return `${this.route.from} → ${this.route.to}`;
});

// Pre-save middleware to generate tripId
tripSchema.pre('save', async function(next) {
  if (this.isNew && !this.tripId) {
    // Generate trip ID like TRP00001
    const count = await mongoose.model('Trip').countDocuments();
    this.tripId = `TRP${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

// Instance method to start trip
tripSchema.methods.startTrip = function() {
  this.status = 'In Progress';
  this.actualStartTime = new Date();
  return this.save();
};

// Instance method to complete trip
tripSchema.methods.completeTrip = function() {
  this.status = 'Completed';
  this.endDate = new Date();
  this.actualEndTime = new Date();

  if (this.actualStartTime) {
    this.actualDuration = (this.actualEndTime - this.actualStartTime) / (1000 * 60 * 60); // hours
  }

  return this.save();
};

export default mongoose.model('Trip', tripSchema);