// app.js
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
//this is for Toolbar
import AddImage from './ImageQuickMenu/addImage'

import InteractiveImage from './InteractiveImage/interactiveImage';
import InteractiveImageButton from './InteractiveImage/interactiveImageButton';


ClassicEditor
    .create(document.querySelector('#editor'), {
        plugins: [Essentials, Paragraph, Bold, Italic, Image, ImageCaption, ImageStyle, ImageToolbar, InteractiveImage, AddImage],
        toolbar: ['bold', 'italic', 'InteractiveImage'],
        interactiveImage: {
            buttonRender: (src, DomElement) => {
                // You may add it as you wish.
                const button = new InteractiveImageButton({
                    title: "Button",
                    click: () => { 
                        alert(`Button Clicked ${src}`);
                        // console.log(`Button Clicked ${src}`);
                    },
                });
                button.append(DomElement);
            }
        }
    })
    .then(editor => {
        CKEditorInspector.attach(editor);
    })
    .catch(error => {
        console.error(error.stack);
    });