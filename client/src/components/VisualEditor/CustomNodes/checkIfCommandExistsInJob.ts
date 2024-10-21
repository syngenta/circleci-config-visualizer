export default function checkIfCommandExistsInJob(commandName: string, job: any) {
  const jobSteps: any[] = job.steps;
  for (const jobStep of jobSteps){
    if(jobStep===commandName) return true;
  }
  return false;
}