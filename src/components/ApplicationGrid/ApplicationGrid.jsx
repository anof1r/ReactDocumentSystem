import React from 'react'
import { useState, useEffect } from 'react'
import Application from './Application'
import classes from './ApplicationGrid.module.css'

export default function ApplicationGrid() {
  const [applications, setApplications] = useState([])
  const uniqueApplications = new Set()

  useEffect(() => {
    fetch("http://localhost:3001/applications")
      .then(response => response.json())
      .then(data => setApplications(data))
  }, [])

  const findOccurrence = (arr, key) => {
    let applicationsArray = [];
    arr.forEach((i) => {
      if (applicationsArray.some((value) => {
        return value[key] == i[key]
      })) {
        applicationsArray.forEach((j) => {
          if (j[key] === i[key]) {
            j["occurrence"]++
          }
        })
      } else {
        let tmpObj = {}
        tmpObj[key] = i[key]
        tmpObj["occurrence"] = 1
        applicationsArray.push(tmpObj);
      }
    })
    return applicationsArray
  }

  findOccurrence(applications, "document_name").forEach((appl => {
    uniqueApplications.add({
      "document_name": appl.document_name,
      "occurance": appl.occurrence
    })
  }))

  const sortedListOfApplications = Array.from(uniqueApplications).sort((a, b) => {
    return b.occurance - a.occurance
  })

  return (
    <div className="container">
      <div className={classes.application_header}>
        <div className={`row ${classes.shortInfo}`}>
          <div className="col-6">Наименование</div>
          <div className="col-6">Количество заявок</div>
        </div>
      </div>
      {sortedListOfApplications.map(application => {
        return (
          <Application
            documentName={application.document_name}
            countNumber={application.occurance}
            key={application.document_name}
          />
        )
      })}
    </div>
  )
}
