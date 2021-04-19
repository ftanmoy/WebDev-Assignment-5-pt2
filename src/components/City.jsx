import React from 'react'

export const City = (Zipcode) => {
    //essentiall I want to make the page look clean so when nothing is passed in we only see the input bar.
    
    if (Zipcode[0] === undefined) {
        return <div></div>
    }
    else{
        return (
            <div className="info-card">
                <div className="card-header">
                    <strong> Zipcode </strong>
                </div>
                <div className="card-body">
                    <ul className="zipcode-list">
                        <li>ZipCode: {Zipcode[0]} </li>
                    </ul>
                </div>
            </div>
            
        )
    }
    
    //if something is passed in with valid value show the Zipcode Bar.
    
}
