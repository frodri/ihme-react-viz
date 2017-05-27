import React from 'react'
import { Link } from 'react-router-dom'

import './PrefacePage.css'

class PrefacePage extends React.Component {
  render() {
    return (
      <div className="transitionable preface">
        <h1>Visualization</h1>
        <h2>Global Obesity/Overweight Prevalence</h2>
        <p className="preface-description" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p className="preface-instruction" >
          The next section of this page contains a world map. By clicking on a region on that map, you will be directed to a detailed statistics page for it.
        </p>
        <Link className="preface-link" to="/choropleth">Continue to visualization ></Link>
      </div>
    );
  }
}

export default PrefacePage