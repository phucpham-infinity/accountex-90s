import { agenda, startAgenda } from "../src/lib/agenda";
import "../src/jobs/emailJobs"; // import job definition

async function runTest() {
  console.log("⏳ Bắt đầu test queue...");
  
  // Xóa mọi job cũ có tên send-welcome-email trong db để thấy rõ log của lúc này
  await agenda.cancel({ name: "send-welcome-email" });

  // Khởi động agenda
  await startAgenda();

  // Pushing a new job manually
  console.log("⏳ Đẩy job send-welcome-email vào queue...");
  await agenda.now("send-welcome-email", { email: "test-new@example.com", username: "NewTester" });
  
  console.log("⏳ Vui lòng chờ 3-5 giây để worker nhận và xử lý job...");
  
  setTimeout(async () => {
    console.log("⏹️  Dừng test.");
    await agenda.stop();
    process.exit(0);
  }, 8000);
}

runTest().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});