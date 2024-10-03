import mongoose, { Schema, Document, model, Types } from 'mongoose';

// Interface representing the Order document in MongoDB
interface IOrder extends Document {
  user: Types.ObjectId;
  orderNumber: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    lameSelected: string;
    dimensions: {
      Largeur: number;
      Hauteur: number;
    };
    selectedColor: {
      coulisse: string;
      tablier: string;
      lameFinale: string;
    };
    poseInstalled: string;
    manoeuvreSelected: string;
    commandeManualSelected?: string; // Optional field
    optionMotorisationSelected: string;
    optionTelecomandeSelected?: string; // Optional field
    optionInterrupteurSelected?: string; // Optional field
    sortieDeCableSelected?: string; // Optional field
  }>;
  totalAmount: number;
  selectedMethod: string;
  deliveryCost: number;
  selectedAddress: {
    name: string;
    surname: string;
    phoneNumber: string;
    street: string;
    postalCode: string;
    city: string;
    country: string;
    additionalInfo?: string;
  };
  paymentDetails: {
    id: string;
    payer: {
      payer_id: string;
      email_address: string;
      name: {
        given_name: string;
        surname: string;
      };
    };
    method: string;
    status: string;
    update_time: string;
  };
  status:"en cours de traitement" | "expédiée" | "livrée" | "annulée" | "remboursée";
  createdAt: Date;
}

// Order Schema definition
const OrderSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderNumber: { type: String, required: true, unique: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
      lameSelected: { type: String, required: true },
      dimensions: {
        Largeur: { type: Number, required: true },
        Hauteur: { type: Number, required: true },
      },
      selectedColor: {
        coulisse: { type: String, required: true },
        tablier: { type: String, required: true },
        lameFinale: { type: String, required: true },
      },
      poseInstalled: { type: String, required: true },
      manoeuvreSelected: { type: String, required: true },
      commandeManualSelected: { type: String, default: null }, // Optional
      optionMotorisationSelected: { type: String, required: true },
      optionTelecomandeSelected: { type: String, default: null }, // Optional
      optionInterrupteurSelected: { type: String, default: null }, // Optional
      sortieDeCableSelected: { type: String, default: null }, // Optional
    },
  ],
  totalAmount: { type: Number, required: true, min: 0 },
  selectedMethod: { type: String, required: true },
  deliveryCost: { type: Number, required: true, min: 0 },
  selectedAddress: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    additionalInfo: { type: String, default: null }, // Optional
  },
  paymentDetails: {
    id: { type: String, required: true },
    payer: {
      payer_id: { type: String, required: true },
      email_address: { type: String, required: true },
      name: {
        given_name: { type: String, required: true },
        surname: { type: String, required: true },
      },
    },
    method: { type: String, required: true },
    status: { type: String, required: true },
    update_time: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["en cours de traitement" , "expédiée" , "livrée" , "annulée" , "remboursée"],
    default: "en cours de traitement",
    required: true,
  },
  createdAt: { type: Date, default: Date.now, required: true },
});

// Compound index to ensure each order number is unique
OrderSchema.index({ orderNumber: 1 }, { unique: true });

// Pre-save hook to enforce business logic before saving
OrderSchema.pre<IOrder>('save', function (next) {
  if (this.totalAmount <= 0) {
    return next(new Error('Total amount must be greater than zero.'));
  }
  next();
});

// Create or reuse the Order model
const Order = mongoose.models.Order || model<IOrder>('Order', OrderSchema);

export default Order;
