import React, { createContext, useState } from 'react';

const DocListContext = createContext();

const DocListProvider = ({ children }) => {
    const [docList, setDocList] = useState([]);
    // console.log(docList);

    return (
        <DocListContext.Provider value={{ docList, setDocList }}>
            {children}
        </DocListContext.Provider>
    );
};

export { DocListContext, DocListProvider };