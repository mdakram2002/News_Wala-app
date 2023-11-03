import React, { Component } from 'react'
// import News from './News';

export default class NewsItems extends Component {

  render() {
    let { title, discription, imageUrl, newsUrl } = this.props;
    return (
      <div className="card" style={{ width: "18rem;" }}>
        <img src={!imageUrl ? "https://cdn.mos.cms.futurecdn.net/oxMY6AeCKRV3vxtRYyhHBG-1200-80.jpg" : imageUrl}
          className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{discription}</p>
          <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark">read more</a>
        </div>
      </div>
    )
  }
}
