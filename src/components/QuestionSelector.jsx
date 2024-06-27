import { Box, Button, Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";

import { questionsdb } from "../database/questions";

const questions = getTitles();
const ACTIVE_COLOR = "blue.400";

const QuestionSelector = ({ selectedQuestion, onSelect }) => {
    return (
        <Box ml={5} mb={4}>
            <Text mb={2} fontSize="lg">
                Question:
            </Text>
            <Menu isLazy>
                <MenuButton as={Button}>
                    Select a question
                </MenuButton>
                <MenuList bg="#110c1b">
                    {questions.map((ques) => (
                        <MenuItem
                            key={ques}
                            color={ques === selectedQuestion ? ACTIVE_COLOR : ""}
                            bg={ques === selectedQuestion ? "grey.900" : "transparent"}
                            _hover={{
                                color: ACTIVE_COLOR,
                                bg: "grey.900",
                            }}
                            onClick={() => onSelect(ques)}
                        >
                            {ques}
                            &nbsp;
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    );
};

export default QuestionSelector;
