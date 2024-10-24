export default function checkIfExecutorExistsInJob(
  executorName: string,
  job: any
) {
  if (job.executor === executorName) {
    return true;
  }
  return false;
}
