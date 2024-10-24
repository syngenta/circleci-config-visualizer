import objToArrayConverter from "../../../utils/objToArrayConverter";

export default function checkIfJobExistsInWorkflow(
  jobName: string,
  workflow: any
): boolean {
  for (const job of workflow.jobs) {
    console.log(job);
    // console.log(typeof job);
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
