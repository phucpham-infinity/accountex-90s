import { NextRequest } from "next/server";
import { agenda } from "@/lib/agenda";
import { apiResponse } from "@/lib/apiResponse";
import { withAuth } from "@/lib/withAuth";

/**
 * @swagger
 * /api/admin/queues:
 *   get:
 *     summary: Retrieve running/pending jobs in queue
 *     tags: [Admin Queues]
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
export const GET = withAuth(async (req: NextRequest, props: any, userId: string) => {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") || "";
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const overview = searchParams.get("overview") === "true";

    if (overview) {
      const overviewStats = await agenda.getJobsOverview();
      return apiResponse({
        data: overviewStats,
        message: "Lấy thống kê jobs theo tên thành công",
        status: 200,
      });
    }

    const query: any = {};
    if (name) query.name = name;
    query.limit = limit;
    query.skip = skip;

    // Agenda 6: queryJobs returns { jobs, total }
    const result = await agenda.queryJobs(query);

    return apiResponse({
      data: result,
      message: "Lấy danh sách các jobs đang chạy thành công",
      status: 200,
    });
  } catch (error: any) {
    return apiResponse({
      message: error.message || "Lỗi khi lấy thông tin hàng đợi (queue)",
      status: 500,
    });
  }
});

/**
 * @swagger
 * /api/admin/queues:
 *   post:
 *     summary: Enqueue a new job manually
 *     tags: [Admin Queues]
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
export const POST = withAuth(async (req: NextRequest, props: any, userId: string) => {
  try {
    const body = await req.json();
    const { name, data } = body;

    if (!name) {
      return apiResponse({ message: "Thiếu tên job (name)", status: 400 });
    }

    const job = await agenda.now(name, data || {});

    return apiResponse({
      data: job,
      message: `Job ${name} đã được đẩy vào hàng đợi (queue)`,
      status: 201,
    });
  } catch (error: any) {
    return apiResponse({
      message: error.message || "Lỗi push queue mới",
      status: 500,
    });
  }
});

/**
 * @swagger
 * /api/admin/queues:
 *   delete:
 *     summary: Cancel and remove specific jobs from the queue
 *     tags: [Admin Queues]
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
export const DELETE = withAuth(async (req: NextRequest, props: any, userId: string) => {
  try {
    const { searchParams } = new URL(req.url);
    const jobName = searchParams.get("name");

    if (!jobName) {
      return apiResponse({ message: "Thiếu tên job cần xoá", status: 400 });
    }

    const numRemoved = await agenda.cancel({ name: jobName });

    return apiResponse({
      data: { numRemoved },
      message: `Đã xóa thành công ${numRemoved} job(s) mang tên ${jobName}`,
      status: 200,
    });
  } catch (error: any) {
    return apiResponse({
      message: error.message || "Lỗi khi xóa queue",
      status: 500,
    });
  }
});
