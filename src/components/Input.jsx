import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Input = ({editorRef, language}) => {
  const toast = useToast();
  const [input, setInput] = useState(null)
  

}