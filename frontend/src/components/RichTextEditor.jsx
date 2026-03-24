import { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudinaryReady = CLOUD_NAME && CLOUD_NAME !== 'your_cloud_name' && UPLOAD_PRESET;

const toolbarOptions = [
  [{ header: [2, 3, false] }],
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link', 'image'],
  ['clean']
];

export default function RichTextEditor({ value, onChange }) {
  const quillRef = useRef(null);

  const modules = useMemo(() => ({
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: function() {
          const editor = quillRef.current?.getEditor();
          if (!editor) return;

          if (cloudinaryReady) {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;
              const fd = new FormData();
              fd.append('file', file);
              fd.append('upload_preset', UPLOAD_PRESET);
              try {
                const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
                if (!res.ok) throw new Error('Upload failed');
                const data = await res.json();
                const range = editor.getSelection(true);
                editor.insertEmbed(range.index, 'image', data.secure_url);
              } catch {
                alert('Upload ảnh thất bại. Vui lòng thử lại.');
              }
            };
          } else {
            const url = prompt('Nhập URL ảnh:');
            if (url) {
              const range = editor.getSelection(true);
              editor.insertEmbed(range.index, 'image', url);
            }
          }
        }
      }
    }
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
