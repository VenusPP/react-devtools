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

var globalHook = require('../../../../backend/GlobalHook');
globalHook(window);
var Panel = require('./Panel');
var React = require('react');

var node = document.getElementById('container');

function reload() {
  setTimeout(() => {
    React.unmountComponentAtNode(node);
    node.innerHTML = '';
    React.render(<Panel reload={reload} />, node);
  }, 100);
}

React.render(<Panel alreadyFoundReact={true} reload={reload} />, node);
