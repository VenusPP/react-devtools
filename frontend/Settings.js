/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

var React = require('react');
var assign = require('object-assign');
var websocketConnect = require('../backend/websocket-connect');
var setupHighlighter = require('./Highlighter/setup');

type Props = {
  settings: Object,
};

class Settings extends React.Component {
  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      ...props.settings,
      isGlobalSetup: !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__,
      connectedToDevtools: window.__REACT_DEVTOOLS_GLOBAL_HOOK__ && !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent,
    };
  }

  connectDebugger() {
    if (this.state.connectedToDevtools) {
      return;
    }
    websocketConnect('ws://localhost:' + this.state.debugPort + '/');
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.on('react-devtools', agent => {
      setupHighlighter(agent);
    });
    this.setState({connectedToDevtools: true});
  }

  render(): ReactElement {
    if (!this.state.isGlobalSetup) {
      return (
        <div style={styles.container}>
          <h3>Global Hook not setup. Devtools has been misconfigured</h3>
        </div>
      );
    }
    return (
      <div style={styles.container}>
        Devtools port number:
        <input type="number" value={this.state.debugPort} onChange={e => this.setState({debugPort: e.target.value})} />
        <button disabled={this.state.connectedToDevtools} onClick={() => this.connectDebugger()}>Connect to devtools</button>
      </div>
    );
  }
}

var styles = {
  container: {
    flex: 1,
    textAlign: 'center',
    padding: 50,
  },
};
module.exports = Settings;
