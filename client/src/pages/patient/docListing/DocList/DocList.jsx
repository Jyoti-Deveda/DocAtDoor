import DocCard from '@/components/docsComp/DocCard/DocCard'
import React from 'react'

const DocList = () => {

    return (
        <div className={`grid md:grid-cols-2 gap-6`}>
            <DocCard />
            <DocCard />
            <DocCard />
            <DocCard />
        </div>
    )
}

export default DocList