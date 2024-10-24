import { useState, useCallback, useEffect } from "react";
import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  MiniMap,
  Controls,
  addEdge,
  type Node,
  type OnConnect,
  type OnNodeDrag,
  type NodeTypes,
  Background,
  BackgroundVariant,
  MarkerType,
  // useReactFlow,
  getNodesBounds,
  getViewportForBounds,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";
import WorkflowNode from "./CustomNodes/WorkflowNode";
import JobNode from "./CustomNodes/JobNode";
import ExecutorNode from "./CustomNodes/ExecutorNode";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCommands,
  getAllExecutors,
  getAllJobs,
  getAllOrbs,
  getAllWorkflows,
  getData,
} from "../../redux/data/dataSlice";
import objToArrayConverter from "../../utils/objToArrayConverter";
import OrbNode from "./CustomNodes/OrbNode";
import {
  getSelectedEntity,
  setSelectedEntity,
} from "../../redux/selectedEntity/selectedEntitySlice";
import { getDarkMode } from "../../redux/darkMode/darkModeSlice";
import {
  getActiveEntity,
  setActiveEntity,
} from "../../redux/activeEntity/activeEntitySlice";
import checkIfJobExistsInWorkflow from "./CustomNodes/checkIfJobExistsInWorkflow";
import { toPng } from "html-to-image";
import checkIfWorkflowUsesJob from "./CustomNodes/getAllWorkflowsForAJob";
import CommandNode from "./CustomNodes/CommandNode";
import checkIfCommandExistsInJob from "./CustomNodes/checkIfCommandExistsInJob";
import {
  getVisibleCommands,
  getVisibleExecutors,
  getVisibleJobs,
  setCommandsVisible,
  setExecutorsVisible,
  setJobsVisible,
} from "../../redux/visibleEntities/visibleEntitiesSlice";

const imageWidth = 3000;
const imageHeight = 3000;

const nodeTypes: NodeTypes = {
  workflow: WorkflowNode,
  job: JobNode,
  executor: ExecutorNode,
  orb: OrbNode,
  command: CommandNode,
};

const onNodeDrag: OnNodeDrag = (_, node) => {
  console.log("drag event", node.data);
};

type VisualEditorProps = {
  takingScreenshot: boolean;
  setTakingScreenshot: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function VisualEditor({
  takingScreenshot,
  setTakingScreenshot,
}: VisualEditorProps) {
  const workflows = useSelector(getAllWorkflows);
  const executors = useSelector(getAllExecutors);
  const jobs = useSelector(getAllJobs);
  const orbs = useSelector(getAllOrbs);
  const commands = useSelector(getAllCommands);
  const darkMode = useSelector(getDarkMode);
  const visibleJobs = useSelector(getVisibleJobs);
  const visibleExecutors = useSelector(getVisibleExecutors);
  const visibleCommands = useSelector(getVisibleCommands);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [active, setActive] = useState<{
    type: string | undefined;
    entity: Node | any;
  } | null>(null);
  const selectedEntity = useSelector(getSelectedEntity);
  const activeEntity = useSelector(getActiveEntity);
  const dispatch = useDispatch();
  const reactFlow = useReactFlow();

  const data = useSelector(getData);

  const renderExecutors = () => {
    let i = -700;
    executors.map((executor) => {
      if (visibleExecutors?.includes(executor[0])) {
        const executorNode = {
          id: executor[0],
          data: { label: executor[0], executor },
          position: { x: i, y: 1700 },
          type: "executor",
          focusable: true,
        };
        i += 300;
        setNodes((nds) => [...nds, executorNode]);
      }
    });
  };

  const renderJobs = () => {
    let i = -600;
    jobs.map((job) => {
      if (visibleJobs.includes(job[0])) {
        const jobNode = {
          id: job[0],
          data: { label: job[0], job },
          position: { x: i, y: 1200 },
          type: "job",
          focusable: true,
        };
        i += 300;
        setNodes((nds) => [...nds, jobNode]);
      }
    });
  };

  const renderWorkflows = () => {
    let i = 0,
      count = 0;
    for (const workflow of workflows) {
      if (workflow[0] === "version") continue;
      const workflowNode = {
        id: workflow[0],
        data: { label: workflow[0], workflow, jobs: jobs },
        position: { x: i, y: 400 },
        type: "workflow",
        focusable: true,
      };
      i += 600;
      count++;
      setNodes((nds) => [...nds, workflowNode]);
    }
  };

  const renderOrbs = () => {
    const orbNode = {
      id: "orb",
      data: { orb: orbs },
      position: { x: 0, y: 100 },
      type: "orb",
      focusable: true,
    };
    setNodes((nds) => [...nds, orbNode]);
  };

  const renderCommands = () => {
    let i = 5;
    for (const command of commands) {
      if (visibleCommands.includes(command[0])) {
        const commandNode = {
          id: command[0],
          data: { label: command[0], command },
          position: { x: -600, y: i * -1 },
          type: "command",
          focusable: true,
        };
        i += 200;
        setNodes((nds) => [...nds, commandNode]);
      }
    }
  };

  const renderEdges = () => {
    if (executors.length && jobs.length) {
      jobs.map((job) => {
        if (activeEntity?.type === "workflow") {
          const workflowJobs: any[] = [];
          activeEntity.entity[1].jobs.forEach((wJob: any) => {
            if (job[0] === objToArrayConverter(wJob)[0][0]) {
              workflowJobs.push(job);
            }
          });
          workflowJobs.map((job: any) => {
            var jobName, jobData;
            if(typeof job === "object"){
              jobName = job[0];
              jobData = job[1];
            }
            else{
              jobName = job;
              jobData = job;
            }
            setEdges((eds) => [
              ...eds,
              {
                id: `${jobData.executor}-${jobName}`,
                source: jobData.executor,
                target: jobName,
                animated: true,
                style: { stroke: "#ffb41eff", strokeWidth: 1.5 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  width: 20,
                  height: 20,
                  color: "#ffb41eff",
                },
              },
            ]);
          });
        } else if (activeEntity?.type === "job") {
          const activeJobName = activeEntity?.entity[0];
          const activeJobData = activeEntity?.entity[1];
          setEdges((eds) => [
            ...eds,
            {
              id: `${activeJobData.executor}-${activeJobName}`,
              source: activeJobData.executor,
              target: activeJobName,
              animated: true,
              style: { stroke: "#ffb41eff", strokeWidth: 1.5 },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: "#ffb41eff",
              },
            },
          ]);
        } else if (activeEntity?.type === "executor") {
          const executorName = activeEntity?.entity[0];
          const jobsUsingExecutor: string[] = [];
          jobs.forEach((job: any) => {
            const jobName: string = job[0];
            const jobData: any = job[1];
            const jobExecutor: any[] = jobData.executor;
            if (
              typeof jobExecutor === "string" &&
              jobExecutor === executorName
            ) {
              jobsUsingExecutor.push(jobName);
            }
          });
          jobsUsingExecutor.map((job: string) => {
            setEdges((eds) => [
              ...eds,
              {
                id: `${executorName}-${job}`,
                source: executorName,
                target: job,
                animated: true,
                style: { stroke: "#ffb41eff", strokeWidth: 1.5 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  width: 20,
                  height: 20,
                  color: "#ffb41eff",
                },
              },
            ]);
          });
        }
      });
    }

    if (jobs.length && workflows.length) {
      workflows.map((workflow) => {
        console.log(workflow);
        const workflowName = workflow[0];
        const workflowData = workflow[1];
        const workflowJobsArray = workflow[1].jobs;
        console.log(workflowJobsArray);
        workflowJobsArray?.map((wJob: any[]) => {
          const wJobArray =
            typeof wJob === "string" ? [wJob] : objToArrayConverter(wJob)[0];
          // const wJobArray = objToArrayConverter(wJob)[0];
          const wJobName = wJobArray?.[0];
          if (
            activeEntity?.type === "workflow" &&
            activeEntity?.entity[0] === workflowName &&
            checkIfJobExistsInWorkflow(wJobName, workflowData)
          ) {
            setEdges((eds) => [
              ...eds,
              {
                id: `${wJobName}-${workflowName}`,
                source: wJobName,
                target: workflowName,
                animated: true,
                // label: `${wJobArray[0]} (Job) ---> ${workflow[0]} (Workflow)`,
                style: { stroke: "#0672cbff", strokeWidth: 1.5 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  width: 20,
                  height: 20,
                  color: "#0672cbff",
                },
              },
            ]);
            // }
          } else if (
            activeEntity?.type === "job" &&
            activeEntity?.entity[0] === wJobName &&
            checkIfWorkflowUsesJob(workflowName, workflows, wJobName)
          ) {
            setEdges((eds) => [
              ...eds,
              {
                id: `${wJobName}-${workflowName}`,
                source: wJobName,
                target: workflowName,
                animated: true,
                // label: `${wJobArray[0]} (Job) ---> ${workflow[0]} (Workflow)`,
                style: { stroke: "#0672cbff", strokeWidth: 1.5 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  width: 20,
                  height: 20,
                  color: "#0672cbff",
                },
              },
            ]);
          }
        });
      });
    }

    if (commands.length && jobs.length) {
      commands.map((command) => {
        if (activeEntity?.type === "job") {
          const commandsUsedInJob: any[] = [];
          commands.forEach((command: any) => {
            const commandName = command[0];
            if (
              checkIfCommandExistsInJob(commandName, activeEntity?.entity[1])
            ) {
              commandsUsedInJob.push(commandName);
            }
          });
          commandsUsedInJob.map((command: any) => {
            const commandName = command;
            const jobName = activeEntity?.entity[0];
            setEdges((eds) => [
              ...eds,
              {
                id: `${commandName}-${jobName}`,
                source: commandName,
                target: jobName,
                animated: true,
                targetHandle: "command",
                style: { stroke: "#ff401eff", strokeWidth: 1.5 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  width: 20,
                  height: 20,
                  color: "#ff401eff",
                },
              },
            ]);
          });
        } else if (activeEntity?.type === "command") {
          const commandName = activeEntity?.entity[0];
          const jobsUsingCommand: any[] = [];
          jobs.forEach((job: any) => {
            const jobName: string = job[0];
            const jobData: any = job[1];
            const jobSteps: any[] = jobData.steps;
            jobSteps.forEach((jobStep: any) => {
              if (typeof jobStep === "string" && jobStep === commandName) {
                jobsUsingCommand.push(jobName);
              }
            });
          });
          jobsUsingCommand.map((job: any) => {
            const jobName = job;
            setEdges((eds) => [
              ...eds,
              {
                id: `${commandName}-${jobName}`,
                source: commandName,
                target: jobName,
                animated: true,
                targetHandle: "command",
                style: { stroke: "#ff401eff", strokeWidth: 1.5 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  width: 20,
                  height: 20,
                  color: "#ff401eff",
                },
              },
            ]);
          });
        }
      });
    }
  };

  useEffect(() => {
    setNodes([]);
    setEdges([]);
    executors.length && renderExecutors();
    jobs.length && renderJobs();
    commands.length && renderCommands();
    workflows.length && renderWorkflows();
    orbs.length && renderOrbs();
    setTimeout(() => renderEdges(), 1000);
  }, [data, executors, jobs, orbs, commands, activeEntity]);

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  function downloadImage(dataUrl: any) {
    setTakingScreenshot(false);
    const a = document.createElement("a");

    a.setAttribute("download", "reactflow.png");
    a.setAttribute("href", dataUrl);
    a.click();
  }

  useEffect(() => {
    if (activeEntity.type === "workflow") {
      const workflowJobs = activeEntity.entity[1].jobs.map((job) => {
        const jobArray =
          typeof job === "string" ? [job] : objToArrayConverter(job)[0];
        // const jobArray = objToArrayConverter(job)[0];
        return jobArray[0];
      });
      dispatch(setJobsVisible(workflowJobs));
    } else if (activeEntity.type === "job") {
      const executor = activeEntity.entity[1].executor;
      dispatch(setExecutorsVisible(executor));
    }
    setTimeout(() => {
      reactFlow.fitView({ duration: 400 });
    }, 500);
  }, [activeEntity]);

  useEffect(() => {
    if (takingScreenshot) {
      const nodesBounds = getNodesBounds(nodes);
      const viewport = getViewportForBounds(
        nodesBounds,
        imageWidth,
        imageHeight,
        1,
        10,
        0
      );
      const canva: HTMLElement = document.getElementById("canva")!;
      toPng(canva, {
        backgroundColor: "#fff",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: imageWidth.toString(),
          height: imageHeight.toString(),
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      }).then(downloadImage);
    }
  }, [takingScreenshot]);

  return (
    <div
      className="canva w-full h-full"
      data-aos="fade"
      data-aos-duration={500}
    >
      <ReactFlow
        className="bg-gray-800"
        id="canva"
        nodes={nodes}
        colorMode={darkMode ? "dark" : "light"}
        defaultViewport={{ x: 100, y: 100, zoom: 0.6 }}
        //   snapToGrid={true}
        elevateEdgesOnSelect={true}
        elementsSelectable={true}
        zoomOnDoubleClick={true}
        onNodeDoubleClick={(event, node) => {
          dispatch(
            setSelectedEntity({
              type: node.type,
              entity: node.data[node.type || 0],
            })
          );
        }}
        onNodeClick={(event, node) => {
          setActive({
            type: node.type,
            entity: node.data[node.type || 0],
          });
        }}
        onPaneClick={() => {
          selectedEntity.type &&
            dispatch(setSelectedEntity({ type: null, entity: null }));
          activeEntity.type &&
            dispatch(setActiveEntity({ type: null, entity: null }));
          visibleJobs.length && dispatch(setJobsVisible([]));
          visibleExecutors.length && dispatch(setExecutorsVisible([]));
          visibleExecutors.length && dispatch(setCommandsVisible([]));
        }}
        defaultMarkerColor="red"
        nodeTypes={nodeTypes}
        edges={edges}
        //   edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
        // defaultEdgeOptions={{ animated: true }}
      >
        <Background variant={BackgroundVariant.Dots} className="bg-gray-800" />
        {!takingScreenshot && <MiniMap pannable zoomable={false} />}
        {!takingScreenshot && <Controls />}
      </ReactFlow>
    </div>
  );
}
