/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';


import s from './styles.css';
import { title, html } from './index.md';
import ExampleEditor from "../../components/ExampleEditor/ExampleEditor";

class EditorPage extends React.Component {

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout className={s.content}>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <ExampleEditor />
      </Layout>
    );
  }

}

export default EditorPage;
