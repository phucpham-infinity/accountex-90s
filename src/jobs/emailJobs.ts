import { agenda } from "../lib/agenda";

// Queue: "send-welcome-email"
agenda.define("send-welcome-email", async (job) => {
  const { email, username } = job.attrs.data as { email: string; username: string };

  try {
    console.log(`[JOB] Gửi email welcome tới: ${email} (username: ${username})...`);
    
    // Giả lập delay gửi email 2s
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Tương lai bạn có thể tích hợp nodemailer, AWS SES, resend, ... ở đây
    console.log(`[JOB] Gửi email thành công tới ${email}!`);
  } catch (error) {
    console.error(`[JOB] Lỗi khi gửi email tới ${email}:`, error);
    throw error; // throw data throw error back to Agenda
  }
});
