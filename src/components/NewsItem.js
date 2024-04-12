// class component [rcc]
// card

import React, { Component } from 'react'
import "../style.css"

export default class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props
        return (
            <div className="my-3">
                {/* Removing style={{"width: 18rem;"}} */}

                <div className="card">

                    <div style={{display: 'flex', position: 'absolute', right: 0}}>
                    <span className=" badge rounded-pill bg-danger">{source}</span>
                    </div>

                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title"> {title}...</h5>
                        <p className="card-text">{description}...</p>

                        {/* Bootstrap card */}
                        <p className="card-text"><small className="text-body-secondary">By {author? author:"Unknown"} on {new Date(date).toGMTString()}</small></p>

                        {/* newsUrl is sent inside curly braces as js because it is a js variable */}
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
