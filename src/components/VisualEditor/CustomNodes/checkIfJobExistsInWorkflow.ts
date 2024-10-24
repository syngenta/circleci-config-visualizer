import objToArrayConverter from "../../../utils/objToArrayConverter";

export default function checkIfJobExistsInWorkflow(
  jobName: string,
  workflow: any
): boolean {
  for (const job of workflow.jobs) {
    if (typeof job === "object") {
      if (objToArrayConverter(job)[0][0] === jobName) {
        return true;
      }
    } else {
      if (job === jobName) return true;
    }
  }
  return false;
}
