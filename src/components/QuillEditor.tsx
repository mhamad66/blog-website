import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
    const quillRef = useRef<ReactQuill>(null);

    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                ['link', 'image'],
                [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
                ['clean'],
            ],
            handlers: {
            },
        },
    };

    useEffect(() => {
        const quillEditor = quillRef.current?.getEditor();
        if (quillEditor && value !== quillEditor.root.innerHTML) {
            quillEditor.clipboard.dangerouslyPasteHTML(value);
        }
    }, [value]);

    return (
        <ReactQuill
            ref={quillRef}
            value={value}
            onChange={(content, delta, source, editor) => {
                if (editor) {
                    onChange(editor.root?.innerHTML ?? '');
                }
            }}
            modules={modules}
            theme="snow"
        />
    );
};

export default QuillEditor;
