import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ToolBar from "./components/ToolBar/ToolBar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import VisualEditor from "./components/VisualEditor/VisualEditor";
import PropertiesPane from "./components/PropertiesPane/PropertiesPane";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import { getDarkMode, setDarkMode } from "./redux/darkMode/darkModeSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import { setDataReducer } from "./redux/data/dataSlice";
import Development from "./pages/Development/Development";
import { ReactFlowProvider } from "@xyflow/react";
AOS.init();

function App() {
  const [takingScreenshot, setTakingScreenshot] = useState<boolean>(false);
  const dispatch = useDispatch();
  const darkMode = useSelector(getDarkMode);

  useEffect(() => {
    const currentFile = localStorage.getItem("currentFile");
    currentFile && dispatch(setDataReducer(JSON.parse(currentFile)));

    if (localStorage.getItem("darkMode") === "true") {
      dispatch(setDarkMode(true));
      document.documentElement.classList.add("dark");
    } else {
      dispatch(setDarkMode(false));
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // useEffect(() => {
  //   function hideError(e) {
  //     if (
  //       e.message ===
  //       "ResizeObserver loop completed with undelivered notifications."
  //     ) {
  //       const resizeObserverErrDiv = document.getElementById(
  //         "webpack-dev-server-client-overlay-div"
  //       );
  //       const resizeObserverErr = document.getElementById(
  //         "webpack-dev-server-client-overlay"
  //       );
  //       if (resizeObserverErr) {
  //         resizeObserverErr.setAttribute("style", "display: none");
  //       }
  //       if (resizeObserverErrDiv) {
  //         resizeObserverErrDiv.setAttribute("style", "display: none");
  //       }
  //     }
  //   }

  //   window.addEventListener("error", hideError);
  //   return () => {
  //     window.addEventListener("error", hideError);
  //   };
  // }, []);

  return (
    <div className="h-full w-full border-[0px] border-gray-300 absolute flex-col scroll">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/development" element={<Development />} />
          {/* <ConfirmDialog /> */}
          <Route
            path="/editor"
            element={
              <>
                <ToolBar
                  takingScreenshot={takingScreenshot}
                  setTakingScreenshot={setTakingScreenshot}
                />
                <PanelGroup direction="vertical" className="h-[93%]">
                  <Panel maxSize={95} minSize={25} className="w-full h-full">
                    <div className="flex flex-row w-full h-full">
                      <div className="w-full f-full">
                        <ReactFlowProvider>
                          <VisualEditor
                            takingScreenshot={takingScreenshot}
                            setTakingScreenshot={setTakingScreenshot}
                          />
                        </ReactFlowProvider>
                      </div>
                      <PropertiesPane />
                    </div>
                  </Panel>

                  <PanelResizeHandle className="border-2 hover:border-2 hover:border-blue-500 bg-gray-300 dark:border-gray-800 dark:hover:border-blue-500 hover:bg-gray-400" />

                  <Panel minSize={5} maxSize={75} defaultSize={5}>
                    <CodeEditor />
                  </Panel>
                </PanelGroup>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
