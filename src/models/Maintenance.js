import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vehicle',
    required: [true, 'Please specify the vehicle']
  },
  serviceType: {
    type: String,
    required: [true, 'Please add service type'],
    enum: [
      'Engine Oil Change',
      'Brake Pad Replacement',
      'Wheel Alignment',
      'Tire Replacement',
      'Battery Check',
      'Air Filter Replacement',
      'Brake System Check',
      'General Service',
      'Emergency Repair',
      'Other'
    ]
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  scheduledDate: {
    type: Date,
    required: [true, 'Please add scheduled date']
  },
  dueDate: {
    type: Date
  },
  completedDate: {
    type: Date
  },
  cost: {
    type: Number,
    min: [0, 'Cost cannot be negative']
  },
  odometerReading: {
    type: Number,
    min: 0
  },
  technician: {
    name: String,
    phone: String,
    workshop: String
  },
  parts: [{
    name: String,
    quantity: Number,
    cost: Number
  }],
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot be more than 1000 characters']
  },
  nextServiceDue: {
    type: Number, // km
    min: 0
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
maintenanceSchema.index({ vehicle: 1, scheduledDate: -1 });
maintenanceSchema.index({ status: 1 });
maintenanceSchema.index({ priority: 1 });
maintenanceSchema.index({ scheduledDate: 1 });

// Virtual for days until due
maintenanceSchema.virtual('daysUntilDue').get(function() {
  if (!this.dueDate) return null;
  const now = new Date();
  const diffTime = this.dueDate - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Instance method to start maintenance
maintenanceSchema.methods.startMaintenance = function() {
  this.status = 'In Progress';
  return this.save();
};

// Instance method to complete maintenance
maintenanceSchema.methods.completeMaintenance = function(completedDate, cost, notes) {
  this.status = 'Completed';
  this.completedDate = completedDate || new Date();
  this.cost = cost;
  if (notes) this.notes = notes;
  return this.save();
};

export default mongoose.model('Maintenance', maintenanceSchema);