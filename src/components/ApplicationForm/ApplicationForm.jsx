import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import MD5 from 'crypto-js/md5'
import classes from './ApplicationForm.module.css'

export default function ApplicationForm() {
  const [documentName, setDocumentName] = useState("")
  const [selectedUser, setSelectedUser] = useState("")
  const [repeatedRequest, setRepeatedRequest] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then(response => response.json())
      .then(data => setUsers(data))
  }, [])

  const sendRequest = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: MD5(selectedUser + documentName).toString(), user_name: selectedUser, document_name: documentName })
    }
    const response = fetch("http://localhost:3001/applications", requestOptions)
    if (response.status != 200) {
      setRepeatedRequest(true)
    } else {
      setRepeatedRequest(false)
    }
  }
  // Исправить фетч!!!
  return (
    <div className={classes.application}>
      <form className={classes.form}>
        <select onChange={(e) => setSelectedUser(e.target.value)} className={classes.select}>
          <option selected disabled hidden>Выберите сотрудника</option>
          {users.map(user => {
            return (<option value={user.name} key={user.id}>{user.name}</option>)
          })}
        </select>
        <div>
          <input type="text" onChange={(e) => setDocumentName(e.target.value)} className={classes.input}></input>
        </div>
        {repeatedRequest && <span style={{ color: "red" }}> Заявка на этот документ уже отправлена </span>}
        <button type="button" onClick={() => sendRequest()} className={classes.button}>Запросить документ</button>
      </form>
    </div>
  )
}
