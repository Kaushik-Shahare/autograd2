import React, { useState } from 'react';

const DataHandler = ({ question }) => {
    const QuestionContext = React.createContext();
    const [output,setOutput] = useState('');
    const [stdin, setstdin] = useState('');

    const intermidate = (output, stdin) => {
        setOutput(output);
        setstdin(stdin);
        navigator.navigate('/editor');};
        

    const QuestionProvider = ({ children }) => {
        const [selectedData, setSelectedData] = React.useState({ output: '', stdin: '' });
        
      
        
      
        return (
          <QuestionContext.Provider value={{ output, QuestionProvider, stdin }}>
            
            {children}
          </QuestionContext.Provider>
        );
      };
};

export default DataHandler;