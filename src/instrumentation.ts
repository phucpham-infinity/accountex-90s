export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Only import agenda in Node.js environment
    const { startAgenda } = await import("./lib/agenda");
    
    // Import các định nghĩa Job trước khi khởi chạy Worker
    await import("./jobs/emailJobs");

    await startAgenda();
  }
}

