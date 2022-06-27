import React from 'react'

const Donor = () => {
  return (
    <div className="p-4 col-lg-3" >
              <div
                className="card text-white bg-danger mb-3 "
                style={{ maxWidth: 300, marginTop: 20 }}
              >
                <div className="card-body">
                  <h5 className="card-title">John Roe</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <button className="btn btn-sm bg-white">More Info</button>
                </div>
              </div>
            </div>
  )
}

export default Donor