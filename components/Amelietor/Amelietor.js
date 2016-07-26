import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import s from './Amelietor.css';
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  CompositeDecorator,
  ContentState,
  Entity
  } from 'draft-js';

const rawContent = {
  blocks: [
    {
      text: (
        'This is an "immutable" entity: Superman. Deleting any ' +
        'characters will delete the entire entity. Adding characters ' +
        'will remove the entity from the range.'
      ),
      type: 'unstyled',
      entityRanges: [{offset: 31, length: 8, key: 'first'}],
    },
    {
      text: '',
      type: 'unstyled',
    },
    {
      text: (
        'This is a "mutable" entity: Batman. Characters may be added ' +
        'and removed.'
      ),
      type: 'unstyled',
      entityRanges: [{offset: 28, length: 6, key: 'second'}],
    },
    {
      text: '',
      type: 'unstyled',
    },
    {
      text: (
        'This is a "segmented" entity: Green Lantern. Deleting any ' +
        'characters will delete the current "segment" from the range. ' +
        'Adding characters will remove the entire entity from the range.'
      ),
      type: 'unstyled',
      entityRanges: [{offset: 30, length: 13, key: 'third'}],
    },
  ],

  entityMap: {
    first: {
      type: 'TOKEN',
      mutability: 'IMMUTABLE',
    },
    second: {
      type: 'TOKEN',
      mutability: 'MUTABLE',
    },
    third: {
      type: 'TOKEN',
      mutability: 'SEGMENTED',
    },
  },
};

class Amelietor extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = (editorState) => this.setState({editorState});
    this.focus = () => this.refs.editor.focus();

    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };


    const blocks = convertFromRaw(rawContent);

    const decorator = new CompositeDecorator([
      {
        strategy: getEntityStrategy('IMMUTABLE'),
        component: TokenSpan,
      },
      {
        strategy: getEntityStrategy('MUTABLE'),
        component: TokenSpan,
      },
      {
        strategy: getEntityStrategy('SEGMENTED'),
        component: TokenSpan,
      },
    ]);

    this.state = {editorState: EditorState.createWithContent(blocks, decorator)};


    this.state = {
      editorState: EditorState.createWithContent(blocks, decorator),
    };
  }


  render() {
    const {editorState} = this.state;
    return (
      <div>
        <div className={`${s.editor}`}>
          <Editor
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref="editor"
            spellCheck={true}
          />
        </div>
        <input
          onClick={this.logState}
          className={`mdl-button mdl-js-button mdl-button--accent ${s.button}`}
          type="button"
          value="Log State"
        />
      </div>
    );
  }
}

function getEntityStrategy(mutability) {
  return function(contentBlock, callback) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        if (entityKey === null) {
          return false;
        }
        return Entity.get(entityKey).getMutability() === mutability;
      },
      callback
    );
  };
}

function getDecoratedStyle(mutability) {
  switch (mutability) {
    case 'IMMUTABLE': return styles.immutable;
    case 'MUTABLE': return styles.mutable;
    case 'SEGMENTED': return styles.segmented;
    default: return null;
  }
}

const TokenSpan = (props) => {
  const style = getDecoratedStyle(
    Entity.get(props.entityKey).getMutability()
  );
  return (
    <span {...props} style={style}>
            {props.children}
          </span>
  );
};

const styles = {
  root: {
    fontFamily: '\'Helvetica\', sans-serif',
    padding: 20,
    width: 600,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  immutable: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '2px 0',
  },
  mutable: {
    backgroundColor: 'rgba(204, 204, 255, 1.0)',
    padding: '2px 0',
  },
  segmented: {
    backgroundColor: 'rgba(248, 222, 126, 1.0)',
    padding: '2px 0',
  },
};


export default Amelietor;

