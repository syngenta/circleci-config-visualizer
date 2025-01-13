import { Octokit } from "octokit";
import { Buffer } from "buffer";
import { VscDebugDisconnect } from "react-icons/vsc";
import { FaSave } from "react-icons/fa";
import InputBox from "../Widgets/InputBox/InputBox";
import { useEffect, useState } from "react";
import PrimaryButton from "../Widgets/Buttons/PrimaryButton";
import { useSelector, useDispatch } from "react-redux";
import {
  getGithubData,
  setGithubData,
} from "../../redux/githubData/githubDataSlice";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { FaCircleCheck } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { MdSmsFailed } from "react-icons/md";
import { setDataReducer } from "../../redux/data/dataSlice";
import { useNavigate } from "react-router";
import yaml from "js-yaml";
import { IoMdArrowRoundBack } from "react-icons/io";
import IconOnlyButton from "../Widgets/Buttons/IconOnlyButton";
import SecondaryButton from "../Widgets/Buttons/SecondaryButton";
import { IoClose } from "react-icons/io5";
import Loading from "../Widgets/Loading/Loading";

type GitHubProps = {
  viewGithubWindow: boolean;
  setViewGithubWindow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GitHub({
  viewGithubWindow,
  setViewGithubWindow,
}: GitHubProps) {
  const [repos, setRepos] = useState<any>([]);
  const [filteredRepos, setFilteredRepos] = useState<any>([]);
  const [searchedRepo, setSearchedRepo] = useState<string>("");
  const [selectedRepo, setSelectedRepo] = useState<any>({
    name: null,
    config: null,
    description: null,
    private: null,
  });
  const [PAT, setPAT] = useState<string>("");
  const [invalidPAT, setInvalidPAT] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const githubData = useSelector(getGithubData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    githubData?.token && getAllRepos();
  }, [githubData?.token]);

  const getAllRepos = async () => {
    setLoading(true);
    const octokit = new Octokit({ auth: githubData.token });
    const data = await octokit.paginate(`GET /user/repos`, {
      per_page: 100,
      type: "all",
      // visibility: "private",
      sort: "updated",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    setLoading(false);
    setRepos(data);
    setFilteredRepos(data);
  };

  const readRepoConfig = async (
    repo: string,
    description: string,
    isPrivate: boolean,
    owner: string
  ) => {
    setLoading(true);
    const octokit = new Octokit({ auth: githubData.token });

    try {
      const data = await octokit.request(
        `GET /repos/${owner}/${repo}/contents/.circleci/config.yml`,
        {
          owner: owner,
          repo: repo,
          path: ".circleci/config.yml",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      const decodedFile = Buffer.from(data.data.content, "base64").toString(
        "binary"
      );
      setSelectedRepo({
        name: repo,
        config: decodedFile,
        description: description,
        private: isPrivate,
      });
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      if (e.message.includes("Error reading file: Not Found")) {
        setSelectedRepo({
          name: repo,
          config: null,
          description: description,
          private: isPrivate,
        });
      }
    }
  };

  const saveGitHubToken = async () => {
    try {
      const octokit = new Octokit({ auth: PAT });
      setInvalidPAT(false);
      const userData = await octokit.request("GET /user", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      const data = JSON.stringify({
        token: PAT,
        username: userData.data.login,
        icon: userData.data.avatar_url,
        email: userData.data.email,
      });
      const encodedData = Buffer.from(data, "binary").toString("base64");
      dispatch(setGithubData(data));
      localStorage.setItem("githubData", encodedData);
    } catch (e: any) {
      if (e.message.includes("Bad credentials")) {
        setInvalidPAT(true);
      }
    }
  };

  return (
    <div
      className={`bg-black/80 backdrop-blur-sm absolute top-0 left-0 w-full h-full z-[5] flex flex-row justify-center items-center`}
    >
      <div
        className={`w-[60%] flex flex-col ${
          githubData ? "h-[90%] justify-start" : "h-[70%] justify-center"
        } bg-gray-200 dark:bg-gray-800 rounded items-center overflow-y-scroll relative pb-6`}
      >
        {selectedRepo.name && (
          <IconOnlyButton
            icon={
              <IoMdArrowRoundBack
                size={25}
                className={`text-gray-500 absolute top-6 left-6`}
              />
            }
            onClick={() => {
              setSelectedRepo({
                name: null,
                config: null,
                description: null,
                private: null,
              });
            }}
          />
        )}
        <IconOnlyButton
          icon={
            <IoClose
              size={25}
              className={`text-gray-500 absolute top-6 right-6`}
            />
          }
          onClick={() => {
            setViewGithubWindow(false);
          }}
        />
        {githubData ? (
          <div
            className={`flex flex-col items-center justify-center mt-16 mb-6 w-full`}
          >
            <div className={`relative w-[120px] h-[120px]`}>
              <img
                src={githubData.icon}
                className="w-[120px] h-[120px] rounded-full border-4 border-green-700"
              />
              <PiPlugsConnectedFill
                size={30}
                className="text-green-700 absolute bottom-0 -right-4"
              />
            </div>
            <SecondaryButton
              label={"Disconnect"}
              className="text-red-500 mt-6"
              icon={<VscDebugDisconnect size={25} className={`text-red-500`} />}
              onClick={() => {
                localStorage.removeItem("githubData");
                dispatch(setGithubData(null));
              }}
            />
          </div>
        ) : (
          <VscDebugDisconnect size={70} className="mb-8 dark:text-gray-400" />
        )}
        {githubData ? (
          <div className="flex flex-col justify-center items-center">
            <p className="text-[30px] font-semibold text-gray-800 dark:text-gray-300 text-center">
              GitHub Profile Connected
            </p>
            <div className="flex flex-row justify-center items-center gap-2">
              <p className="text-[15px] font-medium text-gray-700 dark:text-gray-300/80">
                Username:
              </p>
              <p className="text-[13px] text-gray-700 dark:text-gray-400 text-center">
                {githubData.username}
              </p>
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <p className="text-[15px] font-medium text-gray-700 dark:text-gray-300/80">
                Email:
              </p>
              <p className="text-[13px] text-gray-700 dark:text-gray-400 text-center">
                {githubData.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="text-[30px] font-semibold text-gray-800 dark:text-gray-300 text-center">
              Connect your GitHub Profile
            </p>
            <p className="text-[15px] text-gray-700 w-[60%] mt-2 dark:text-gray-400 text-center">
              Connect your Account by adding your Personal Access Token (PAT)
              and sync config files directly from your GitHub
            </p>
            <div className="w-[60%] flex flex-row gap-4 mt-6">
              <div className="w-full">
                <InputBox
                  type="password"
                  className=""
                  value={githubData ? githubData.token : PAT}
                  onChange={(e) => {
                    setPAT(e.target.value);
                  }}
                  disabled={githubData}
                />
              </div>
              <PrimaryButton
                icon={<FaSave />}
                label={`Save`}
                className="px-4"
                color="bg-green-600"
                disabled={!PAT || githubData}
                onClick={saveGitHubToken}
              />
            </div>
            <div className="w-[60%]">
              {invalidPAT && (
                <p className="text-red-500 text-[12px] text-left mt-1">
                  Invalid Token
                </p>
              )}
            </div>
            <p className="text-[11px] text-gray-700 w-[60%] mt-8 dark:text-gray-400 text-center">
              Create a Personal Access Token (PAT) with these scopes: 'repo',
              'read:org' and 'user', in Developer settings in your GitHub
              account.
            </p>
            <p className="text-[11px] text-gray-700 w-[60%] mt-8 dark:text-gray-400 text-center">
              Refer here:{" "}
              <a
                target="_blank"
                href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic"
                className="text-blue-500 underline"
              >
                https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic
              </a>
            </p>
          </div>
        )}

        {githubData &&
          (!selectedRepo.name ? (
            <div className="w-[90%] mt-6">
              <p className="text-[20px] font-medium text-gray-700 dark:text-gray-300/80">
                {`Found ${repos.length} repositories:`}
              </p>
              <div className="w-full">
                <InputBox
                  type="text"
                  className=""
                  value={searchedRepo}
                  onChange={(e) => {
                    setSearchedRepo(e.target.value);
                    setFilteredRepos(
                      repos.filter(
                        (repo: any) =>
                          repo.name
                            .toLowerCase()
                            .indexOf(e.target.value.toLowerCase()) !== -1
                      )
                    );
                  }}
                  placeholder="Search repo name here..."
                  disabled={false}
                />
              </div>
              <div
                className={`mt-4 ${
                  filteredRepos.length && "border-t-[1px]"
                } dark:border-gray-600 border-gray-400 rounded`}
              >
                {loading && <Loading text="Fetching..." />}
                {filteredRepos.map((repo: any) => (
                  <div
                    className={`flex flex-col justify-start items-center gap-2 py-4 px-4 border-x-[1px] border-b-[1px] dark:border-gray-600 border-gray-400 hover:bg-gray-500/40 cursor-pointer`}
                    onClick={async () => {
                      setSelectedRepo({
                        ...selectedRepo,
                        name: repo.name,
                        description: repo.description,
                        private: repo.private,
                      });
                      await readRepoConfig(
                        repo.name,
                        repo.description,
                        repo.private,
                        repo.owner.login
                      );
                    }}
                  >
                    <div className="flex flex-row justify-start items-center w-full gap-2">
                      <p className="text-[15px] text-gray-800 font-medium dark:text-gray-300 text-center">
                        {repo.name}
                      </p>
                      {repo.private && (
                        <p className="text-[10px] border-[1px] border-gray-600 text-gray-600 dark:border-gray-500 dark:text-gray-500 rounded-full px-1 py-[1px]">
                          Private
                        </p>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-700 dark:text-gray-400 w-full">
                      {repo.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 flex flex-col justify-center items-center w-[80%] border-[1px] dark:border-gray-700 border-gray-400 rounded py-6">
              <div className="w-full mb-8 border-b-[1px] dark:border-gray-700 border-gray-400 px-6 pb-6">
                <div className="flex flex-row justify-start items-center w-full gap-4 mb-2">
                  <p className="text-[15px] text-gray-800 font-medium dark:text-gray-300 text-center">
                    {selectedRepo.name}
                  </p>
                  {selectedRepo.private && (
                    <p className="text-[10px] border-[1px] border-gray-800 text-gray-800 dark:border-gray-500 dark:text-gray-500 rounded-full px-1 py-[1px]">
                      Private
                    </p>
                  )}
                </div>
                <p className="text-[11px] text-gray-700 dark:text-gray-400 w-full">
                  {selectedRepo.description}
                </p>
              </div>
              {loading && <Loading text="Loading..." />}
              {selectedRepo.config ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-row justify-center items-center gap-2">
                    <p className="text-[15px] font-medium text-gray-700 dark:text-gray-300/80">
                      {`Found config.yml in the repo`}
                    </p>
                    <FaCircleCheck className="text-green-600" size={20} />
                  </div>
                  <PrimaryButton
                    icon={<FaDownload />}
                    label={`Load config`}
                    className="px-4 mt-4"
                    color="bg-green-600"
                    onClick={() => {
                      const yamlData = yaml.load(selectedRepo.config);
                      localStorage.setItem(
                        "currentFile",
                        JSON.stringify(yamlData)
                      );
                      dispatch(setDataReducer(yamlData));
                      navigate("/editor");
                    }}
                  />
                </div>
              ) : (
                !loading && (
                  <div className="flex flex-row justify-center items-center gap-2">
                    <p className="text-[15px] font-medium text-gray-700 dark:text-gray-300/80">
                      {`config.yml not found in the repo`}
                    </p>
                    <MdSmsFailed className="text-yellow-600" size={20} />
                  </div>
                )
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
