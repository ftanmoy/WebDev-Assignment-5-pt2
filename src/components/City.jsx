import React from 'react'

export const City = (Zipcode) => {

    //essentially I want to make the page look clean so when nothing is passed in we only see the input bar.
    if (Zipcode.value == '') {
        return <div></div>
    }
    //if something is passed in with valid value show the Zipcodes.
    else {
        return (
            <div className="info-card">
                <div className="card-header">
                    <strong> Zipcodes for this City: </strong>
                </div>
                <div className="card-body">
                </div>

                <div className="lol">
                    <div>
                        <ul>
                            {Zipcode.value.map(zipcode => {
                                return <ul> {zipcode}</ul>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
