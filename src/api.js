import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";
const input=1;
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode, stdin) => {
  console.log("stdin",stdin)
  const trimmedStdin = stdin.trim();
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin: "5\n8\n",
  });
  return response.data;
};
