import mongoose, { Schema } from "mongoose";

const AgendaJobSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    data: {
      type: Schema.Types.Mixed,
      default: {},
    },
    type: {
      type: String,
      default: "normal",
    },
    priority: {
      type: Number,
      default: 0,
    },
    nextRunAt: {
      type: Date,
      default: null,
      index: true,
    },
    lastModifiedBy: {
      type: String,
      default: null,
    },
    lockedAt: {
      type: Date,
      default: null,
    },
    lastRunAt: {
      type: Date,
      default: null,
    },
    lastFinishedAt: {
      type: Date,
      default: null,
    },
    failedAt: {
      type: Date,
      default: null,
    },
    failCount: {
      type: Number,
      default: 0,
    },
    failReason: {
      type: String,
      default: null,
    },
  },
  { collection: "agendaJobs", timestamps: false },
);

export const AgendaJob =
  mongoose.models.AgendaJob || mongoose.model("AgendaJob", AgendaJobSchema);
