import objToArrayConverter from "../../../utils/objToArrayConverter";

function getAllWorkflowsForAJob(workflows: any[], jobName: string) {
  const jobWorkflows: string[] = [];
  workflows.forEach(workflow=>{
    const workflowName: string = workflow[0];
    const workflowData: any = workflow[1];
    // console.log()
    const workflowJobs: any[] = workflowData?.jobs;
    workflowJobs?.forEach(workflowJob=>{
        const jobArray = objToArrayConverter(workflowJob)[0];
        if(jobArray[0]===jobName){
            jobWorkflows.push(workflowName);
        }
    });
  });
  return jobWorkflows;
}

export default function checkIfWorkflowUsesJob(workflowName: string, workflows: any[], jobName: string) {
  const jobWorkflows = getAllWorkflowsForAJob(workflows, jobName);
  for (const workflow of jobWorkflows) {
    if (workflow === workflowName) {
      return true;
    }
  }
  return false;
}


