import React from 'react'

const ListAnnouncements = (props) => {
    const { announcements } = props;
  return (
  
       <section className="container-fluid ">
      <div className="row py-5">
        <div className="col display-4 d-flex justify-content-center">Announcements</div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <ul>
            {announcements.map((item) => (
              <li className="list-unstyled" key={item.id}>
                <span>{item.date}</span>{" "}
                <span>{item.announcement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

  )
}

export default ListAnnouncements
