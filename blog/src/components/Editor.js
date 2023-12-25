import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// object for Quill modules
 const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default function Editor({value, onChange}){
    return(
            <ReactQuill  value={value}
                onChange={onChange}
                modules={modules} formats={formats} 
            />
    );
}