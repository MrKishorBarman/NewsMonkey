// create spinner gif online

import React, { Component } from 'react'
import loading from "./loading.gif"

export default class Spinner extends Component {
  render() {
    return (
        // making it centered
      <div className="text-center">
        <img className="my-4" src={loading} alt="loading" />
      </div>
    )
  }
} 
