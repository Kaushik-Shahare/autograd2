import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { useQuestionContext } from "../context/dataHandler";
import axios from "axios";

const Output = ({ editorRef, language }) => {
  const { output, stdin, questionId } = useQuestionContext();

  const [areOutputsEqual, setAreOutputsEqual] = useState([]);
  const toast = useToast();
  const [Outputs, setOutputs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [grade, setGrade] = useState(0);

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const normalizeOutput = (outputArray) => {
    return outputArray.map(line => line.trim()).filter(line => line !== "");
  };

  const runCode = async () => {
    console.log("questionId", questionId);
    console.log("stdin", stdin);
    console.log("output", output);
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      let allOutputs = [];
      let hasError = false;

      for (let i = 0; i < stdin.length; i++) {
        const { run: result } = await executeCode(language, sourceCode, stdin[i]);
        if (result.stderr) {
          hasError = true;
          break;
        }
        allOutputs.push(normalizeOutput(result.output.split("\n")));
        await delay(1000); // Delay of 1 second between each request
      }

      setOutputs(allOutputs);
      setIsError(hasError);

      if (!hasError) {
        const normalizedExpectedOutputs = stdin.map((_, index) => normalizeOutput([output[index]]));

        console.log("allOutputs:", allOutputs);
        console.log("normalizedExpectedOutputs:", normalizedExpectedOutputs);

        let passedCount = 0;
        let outputComparisons = [];

        allOutputs.forEach((outputArray, index) => {
          console.log(`Comparing outputs for stdin[${index}]:`);
          console.log("actual output:", outputArray);
          console.log("expected output:", normalizedExpectedOutputs[index]);
          const isEqual = JSON.stringify(outputArray) === JSON.stringify(normalizedExpectedOutputs[index]);
          outputComparisons.push(isEqual);
          if (isEqual) {
            passedCount++;
          }
        });

        setGrade((passedCount / stdin.length) * 100);
        setAreOutputsEqual(outputComparisons);

        console.log("passedCount:", passedCount);
        console.log("outputComparisons:", outputComparisons);
      }

    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }

    axios
      .post(
        "http://localhost:3001/api/grades/create",
        { questionId, grade },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>

      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {Outputs.length > 0
          ? Outputs.map((outputArray, i) => (
              <Box key={i}>
                {outputArray.map((line, j) => (
                  <Text key={j}>{line}</Text>
                ))}
                <div>
                  {areOutputsEqual[i] ? "Correct Answer" : "Incorrect Answer"}
                </div>
              </Box>
            ))
          : 'Click "Run Code" to see the output here'}
        <div>
          {`Grade: ${grade}%`}
        </div>
      </Box>
    </Box>
  );
};

export default Output;
