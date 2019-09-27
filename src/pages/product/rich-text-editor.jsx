import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import propTypes from 'prop-types'
import _ from 'lodash'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class RichTextEditor extends Component {

    static propTypes = {
        detail: propTypes.string
    }

    state = {
        editorState: EditorState.createEmpty(),
    }

    onEditorStateChange = _.debounce((editorState) => {
        console.log('111')
        this.setState({
            editorState,
        });
    }, 500)

    getDetail = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    editorStyle={{ height: 200, border: '1px solid #000', paddingLeft: 10 }}
                    onEditorStateChange={this.onEditorStateChange}
                />
                {/* <textarea
                    disabled
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                /> */}
            </div>
        );
    }
}