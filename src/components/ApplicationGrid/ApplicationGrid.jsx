import React from 'react'
import { useState, useEffect } from 'react'
import Application from './Application'
import classes from './ApplicationGrid.module.css'

export default function ApplicationGrid() {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/applications")
      .then(response => response.json())
      .then(data => setApplications(data))
  }, [])

  const uniqDocs = [...new Set(applications.map(nameDoc => nameDoc.document_name))]
  const docCounts = uniqDocs.map(
      doc => {
          const count = applications.reduce((total, nameDoc) => nameDoc.document_name == doc ? total + 1 : total, 0);
          return {doc, count};
      }
  ).sort((a, b) => {
    return b.count - a.count
  })

console.log(docCounts)

  return (
    <div className="container">
      <div className={classes.application_header}>
        <div className={`row ${classes.shortInfo}`}>
          <div className="col-6">Наименование</div>
          <div className="col-6">Количество заявок</div>
        </div>
      </div>
      {docCounts.map(application => {
        return (
          <Application
            documentName={application.doc}
            countNumber={application.count}
            key={application.doc}
          />
        )
      })}
    </div>
  )
}
