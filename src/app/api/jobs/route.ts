import { NextRequest } from "next/server";
import { apiResponse } from "@/lib/apiResponse";
import { withAuth } from "@/lib/withAuth";
import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";
import { AgendaJob } from "@/models/AgendaJob";

/**
 * @swagger
 * /api/admin/jobs:
 *   get:
 *     summary: Retrieve running/pending jobs in job
 *     tags: [Admin Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter jobs by job name
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Maximum number of jobs to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of jobs to skip
 *       - in: query
 *         name: overview
 *         schema:
 *           type: boolean
 *         description: If true, returns an overview of job statistics instead of job list
 *     responses:
 *       200:
 *         description: Successful retrieval
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
export const GET = withAuth(
  async (req: NextRequest, props: any, userId: string) => {
    try {
      const { searchParams } = new URL(req.url);
      const name = searchParams.get("name") || "";
      const limit = parseInt(searchParams.get("limit") || "100", 10);
      const skip = parseInt(searchParams.get("skip") || "0", 10);
      const overview = searchParams.get("overview") === "true";

      await connectToDatabase();

      if (overview) {
        const db = mongoose.connection.db;
        if (!db) throw new Error("Could not connect to database");

        const overviewStats = await db
          .collection("agendaJobs")
          .aggregate([
            {
              $group: {
                _id: "$name",
                total: { $sum: 1 },
                locked: { $sum: { $cond: ["$lockedAt", 1, 0] } },
              },
            },
          ])
          .toArray();

        const formattedStats = overviewStats.map((stat) => ({
          name: stat._id,
          total: stat.total,
          running: stat.locked,
        }));

        return apiResponse({
          data: formattedStats,
          message: "Successfully retrieved job statistics",
          status: 200,
        });
      }

      const dbQuery: any = {};
      if (name) dbQuery.name = { $regex: name, $options: "i" };

      const total = await AgendaJob.countDocuments(dbQuery);
      const jobs = await AgendaJob.find(dbQuery)
        .sort({ nextRunAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      return apiResponse({
        data: { jobs, total },
        message: "Successfully retrieved the list of running jobs",
        status: 200,
      });
    } catch (error: any) {
      return apiResponse({
        message: error.message || "Error retrieving job information",
        status: 500,
      });
    }
  },
);

/**
 * @swagger
 * /api/admin/jobs:
 *   post:
 *     summary: Enqueue a new job manually
 *     tags: [Admin Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: send-welcome-email
 *               data:
 *                 type: object
 *                 description: Payload to pass to the job handler
 *                 example: { "email": "admin@example.com", "username": "Admin" }
 *     responses:
 *       201:
 *         description: Job successfully pushed to queue
 *       400:
 *         description: Missing job name
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
export const POST = withAuth(
  async (req: NextRequest, props: any, userId: string) => {
    try {
      const body = await req.json();
      const { name, data, retryJobId } = body;

      if (!name) {
        return apiResponse({ message: "Missing job name", status: 400 });
      }

      await connectToDatabase();

      const job = new AgendaJob({
        name,
        data: data || {},
        nextRunAt: new Date(),
      });

      await job.save();

      // If it's a retry action, clear the old failed job
      if (retryJobId) {
        try {
          await AgendaJob.deleteOne({ _id: new ObjectId(retryJobId) });
        } catch (err) {
          console.error("Failed to cancel old job during retry", err);
        }
      }

      return apiResponse({
        data: job,
        message: `Job ${name} has been pushed to the queue`,
        status: 201,
      });
    } catch (error: any) {
      return apiResponse({
        message: error.message || "Error pushing new job",
        status: 500,
      });
    }
  },
);

/**
 * @swagger
 * /api/admin/jobs:
 *   delete:
 *     summary: Cancel and remove specific jobs from the queue
 *     tags: [Admin Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the jobs to cancel
 *     responses:
 *       200:
 *         description: Successfully removed job(s)
 *       400:
 *         description: Missing job name parameter
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
export const DELETE = withAuth(
  async (req: NextRequest, props: any, userId: string) => {
    try {
      const { searchParams } = new URL(req.url);
      const jobId = searchParams.get("id");
      const jobName = searchParams.get("name");

      await connectToDatabase();

      let query: any = {};
      if (jobId) {
        try {
          query._id = new ObjectId(jobId);
        } catch {
          return apiResponse({ message: "Invalid ID", status: 400 });
        }
      } else if (jobName) {
        query.name = jobName;
      } else {
        return apiResponse({
          message: "Missing job information to delete (id or name)",
          status: 400,
        });
      }

      const result = await AgendaJob.deleteMany(query);
      const numRemoved = result.deletedCount;

      return apiResponse({
        data: { numRemoved },
        message: `Successfully deleted ${numRemoved} job(s)`,
        status: 200,
      });
    } catch (error: any) {
      return apiResponse({
        message: error.message || "Error deleting job",
        status: 500,
      });
    }
  },
);
