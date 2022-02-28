import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { DashboardLayout } from 'layout';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Editor.styles.scss';

function EditorPage() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  return (
    <DashboardLayout hide>
      <div className="ep">
        <h1 className="ep__heading">WYSIWYG Editor</h1>
        <div className="ep__container">
          <Editor
            editorState={editorState}
            wrapperClassName="ep__container-wrapper"
            editorClassName="ep__container-editor"
            onEditorStateChange={onEditorStateChange}
            placeholder="Start typing here..."
            toolbar={{
              options: ['inline', 'textAlign', 'link'],
              inline: {
                options: ['bold', 'italic', 'underline'],
                bold: {
                  icon: '/icon/dashboard/bold.svg',
                  className: 'demo-option-custom',
                },
                italic: {
                  icon: '/icon/dashboard/italic.svg',
                  className: 'demo-option-custom',
                },
                underline: {
                  icon: '/icon/dashboard/underline.svg',
                  className: 'demo-option-custom',
                },
              },
              textAlign: {
                left: {
                  icon: '/icon/dashboard/left.svg',
                  className: 'demo-option-custom',
                },
                center: {
                  icon: '/icon/dashboard/center.svg',
                  className: 'demo-option-custom',
                },
                right: {
                  icon: '/icon/dashboard/right.svg',
                  className: 'demo-option-custom',
                },
                justify: {
                  icon: '/icon/dashboard/justify.svg',
                  className: 'demo-option-custom',
                },
              },
              link: {
                options: ['link'],
                popupClassName: 'ep__container-link',
                link: {
                  icon: '/icon/dashboard/link.svg',
                  className: 'demo-option-custom',
                },
                // unlink: { icon: Icons.unlink, className: 'demo-option-custom' },
              },
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditorPage;
