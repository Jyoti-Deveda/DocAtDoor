import DocCard from '@/components/docsComp/DocCard/DocCard'
import React from 'react'

const DocList = ({
    data,
}) => {

    return (
        <div className={`grid md:grid-cols-2 gap-6`}>
            {data?.map((doc, index) => (
                <DocCard key={index} data={doc} />
            ))
            }
        </div>
    )
}

export default DocList