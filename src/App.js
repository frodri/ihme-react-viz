
//React related imports
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { RouteTransition, presets } from 'react-router-transition'

// Redux related imports
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'

// Page components
import PrefacePage from './pages/PrefacePage'
import ChoroplethPage from './pages/ChoroplethPage'
import CountryBarGraphPage from './pages/CountryBarGraphPage'

import "../node_modules/react-vis/dist/style.css"


class App extends React.Component {
  render() {

    const {history, store} = this.props;

    return ( 
      <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route render={({ location }) => (
              <div className="main-container">
                <RouteTransition  className="transition-container"
                  pathname={location.pathname}
                  {...presets.slideLeft}
                >
                  <Switch location={location} key={location.key}>
                    <Route exact path="/" component={PrefacePage}/>
                    <Route path="/choropleth" component={ChoroplethPage}/>
                    <Route path="/country/:countryId" component={CountryBarGraphPage}/>
                  </Switch>
                </RouteTransition>
              </div>
            )}/>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App