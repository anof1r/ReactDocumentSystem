import React from 'react'
import classes from './ApplicationGrid.module.css'
function Application({ documentName, countNumber }) {
    return (
        <div className={`container ${classes.application}`}>
            <div className={`row ${classes.shortInfo}`}>
                <div className="col-6">
                    {documentName}
                </div>
                <div className="col-6" style={{ textAlign: "center" }}>
                    {countNumber}
                </div>
            </div>
        </div>
    )
}

export default Application