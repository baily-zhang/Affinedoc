import React, { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { bracketMatching, indentOnInput, indentUnit } from '@codemirror/language';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';

interface CodeMirrorEditorProps {
  value?: string;
  language?: 'javascript' | 'typescript' | 'css' | 'html' | 'json';
  theme?: 'light' | 'dark';
  onChange?: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

const getLanguageExtension = (language: string) => {
  switch (language) {
    case 'javascript':
    case 'typescript':
      return javascript();
    case 'css':
      return css();
    case 'html':
      return html();
    case 'json':
      return json();
    default:
      return javascript();
  }
};

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({
  value = '',
  language = 'javascript',
  theme = 'dark',
  onChange,
  readOnly = false,
  height = '400px'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;

    const extensions = [
      lineNumbers(),
      history(),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      indentUnit.of('  '),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      getLanguageExtension(language),
      EditorView.updateListener.of((update) => {
        if (update.docChanged && onChange) {
          onChange(update.state.doc.toString());
        }
      }),
      EditorView.theme({
        '&': {
          height: height,
          fontSize: '14px'
        },
        '.cm-content': {
          padding: '12px',
          minHeight: '100%'
        },
        '.cm-focused': {
          outline: 'none'
        },
        '.cm-editor': {
          borderRadius: '8px',
          border: theme === 'dark' ? '1px solid #404040' : '1px solid #e2e8f0'
        },
        '.cm-gutters': {
          border: 'none'
        }
      })
    ];

    // Always use dark theme - add debug log
    console.log('Adding oneDark theme');
    extensions.push(oneDark);

    if (readOnly) {
      extensions.push(EditorState.readOnly.of(true));
    }

    const initialState = EditorState.create({
      doc: value,
      extensions
    });

    const view = new EditorView({
      state: initialState,
      parent: editorRef.current
    });

    viewRef.current = view;
    setIsReady(true);

    return () => {
      view.destroy();
      viewRef.current = null;
      setIsReady(false);
    };
  }, [language, theme, readOnly, height]);

  useEffect(() => {
    if (!viewRef.current || !isReady) return;

    const currentValue = viewRef.current.state.doc.toString();
    if (value !== currentValue) {
      const transaction = viewRef.current.state.update({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value
        }
      });
      viewRef.current.dispatch(transaction);
    }
  }, [value, isReady]);

  return (
    <div className="w-full codemirror-wrapper">
      <div ref={editorRef} className="w-full" />
    </div>
  );
};

export default CodeMirrorEditor;