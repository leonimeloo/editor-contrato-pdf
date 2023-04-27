import React, { createContext, useState } from 'react';

type FileContextData = {
    pdfUri: string;
    pdfName: string;
    setPdfUri: (uri: string) => void;
    setPdfName: (name: string) => void;
}

const FileContext = createContext<FileContextData>({} as FileContextData);

export const FileProvider = ({ children }) => {
    const [ fileUri, setFileUri ] = useState<string>('');
    const [ fileName, setFileName ] = useState<string>('');

    const setPdfUri = (uri: string) => {
        setFileUri(uri);
    }

    const setPdfName = (name: string) => {
        setFileName(name);
    }

    return(
        <FileContext.Provider value={{ pdfUri: fileUri, setPdfUri, pdfName: fileName, setPdfName }}>
            {children}
        </FileContext.Provider>
    );
}

export default FileContext;