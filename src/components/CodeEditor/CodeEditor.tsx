import Editor, { useMonaco } from "@monaco-editor/react";
import { useSelector } from "react-redux";
import {
  getAllCommands,
  getAllExecutors,
  getAllJobs,
  getAllOrbs,
  getAllWorkflows,
} from "../../redux/data/dataSlice";
import yaml from "js-yaml";
import checkEmptyObj from "../../utils/checkEmptyObj";
import { getDarkMode } from "../../redux/darkMode/darkModeSlice";

type Code = {
  version: string | number;
  executors?: any;
  orbs?: any;
  commands?: any;
  jobs?: any;
  workflows?: any;
};

export default function CodeEditor() {
  const monaco: any = useMonaco();
  const orbs = useSelector(getAllOrbs);
  const executors = useSelector(getAllExecutors);
  const commands = useSelector(getAllCommands);
  const jobs = useSelector(getAllJobs);
  const workflows = useSelector(getAllWorkflows);
  const darkMode = useSelector(getDarkMode);

  const generateCode = (): string | Code => {
    const orbsObj = {},
      executorsObj = {},
      commandsObj = {},
      jobsObj = {},
      workflowsObj = {};
    orbs.map((orb) => {
      orbsObj[orb[0]] = orb[1];
    });
    executors.map((executor) => {
      executorsObj[executor[0]] = executor[1];
    });
    commands.map((command) => {
      commandsObj[command[0]] = command[1];
    });
    jobs.map((job) => {
      jobsObj[job[0]] = job[1];
    });
    workflows.map((workflow) => {
      workflowsObj[workflow[0]] = workflow[1];
    });
    const code: Code = {
      version: 2.1,
      orbs: orbsObj,
      executors: executorsObj,
      commands: commandsObj,
      jobs: jobsObj,
      workflows: workflowsObj,
    };
    checkEmptyObj(orbsObj) && delete code.orbs;
    checkEmptyObj(executorsObj) && delete code.executors;
    checkEmptyObj(commandsObj) && delete code.commands;
    checkEmptyObj(jobsObj) && delete code.jobs;
    checkEmptyObj(workflowsObj) && delete code.workflows;
    return yaml.dump(code, {
      noArrayIndent: false,
      lineWidth: -1,
      noRefs: true,
    });
  };

  function handleEditorChange(value: any, event: any) {
    console.log("here is the current model value:", value);
  }

  return (
    <div className="overflow-scroll scroll h-full relative">
      <Editor
        className="h-full"
        defaultLanguage={"yaml"}
        value={generateCode() as string}
        onChange={handleEditorChange}
        theme={darkMode ? "vs-dark" : "light"}
      />
    </div>
  );
}
