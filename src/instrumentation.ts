export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Only import agenda in Node.js environment
    const { startAgenda } = await import("./lib/agenda");
    await startAgenda();
  }
}
