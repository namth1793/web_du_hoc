import { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
  [{ header: [2, 3, false] }],
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
  ['clean']
];

export default function RichTextEditor({ value, onChange }) {
  const quillRef = useRef(null);

  const modules = useMemo(() => ({
    toolbar: toolbarOptions
  }), []);

  return (
    <div className="rich-editor">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Nhập nội dung bài viết..."
      />
    </div>
  );
}
