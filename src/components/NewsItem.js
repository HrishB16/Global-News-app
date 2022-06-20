import React from 'react'

const NewsItem = (props) => {
  
    let { title, description, imageUrl,newsUrl,author,date,source} = props;
    return (
      <div className="card mb-5" style={{backgroundColor:"#F0F1EE",  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
         <div style={{display:"flex", justifyContent:"flex-end" , position:"absolute" , right:"0"}}>
           <span className="badge rounded-pill bg-danger" >{source}</span>
         </div>
        
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
              <h5 className="card-title">{title}
                
              </h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    )
  }


export default NewsItem