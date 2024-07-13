import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";
const input = 1;
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode, stdin) => {
  const split = stdin.split(" ");
  const std = split.join("\n");

  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin: std,
  });
  return response.data;
};
