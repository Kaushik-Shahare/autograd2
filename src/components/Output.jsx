import { useContext, useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { useQuestionContext } from "../context/dataHandler";
const Output = ({ editorRef, language /*, output: propOutput, stdin*/ }) => {
  let VerifyOutput;
  const { output, stdin } = useQuestionContext();
  
  const [areOutputsEqual, setAreOutputsEqual] = useState(false);
  const toast = useToast();
  const [Output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode, stdin);
      // const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      VerifyOutput=result.output.split("\n");
      console.log("VerifyOutput",VerifyOutput);
      result.stderr ? setIsError(true) : setIsError(false);
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
    if (JSON.stringify(VerifyOutput) === JSON.stringify(output)) {
      setAreOutputsEqual(true);
    }else{ setAreOutputsEqual(false);}
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
        {Output
        
          ? Output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
          <div> 
          {Output && (areOutputsEqual ? "Correct Answer" : "Incorrect Answer")}

          </div>
          
      </Box>
    </Box>
  );
};
export default Output;
