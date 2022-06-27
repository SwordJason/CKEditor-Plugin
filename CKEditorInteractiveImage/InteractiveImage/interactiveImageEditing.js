import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import AddInteractiveImageCommand from './addInteractiveImageCommand';
import './theme/interactiveImage.css';

export default class InteractiveImageEditing extends Plugin {
    static get requires() {
        return [Widget];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add('addInteractiveImage', new AddInteractiveImageCommand(this.editor));
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('interactiveImageBlock', {
            isObject: true,

            allowWhere: '$block',

            allowAttributes: ['src']
        });
    }

    _defineConverters() {
        const editor = this.editor;
        const conversion = editor.conversion;
        const buttonRender = editor.config.get('interactiveImage').buttonRender;

        conversion.for('upcast').elementToElement({
            view: {
                name: 'section',
                classes: 'interactive-image-wrapper'
            },
            model: (viewElement, { writer: modelWriter }) => {
                return modelWriter.createElement('interactiveImageBlock', {
                    src: viewElement.getAttribute('data-src')
                });
            }
        });

        conversion.for('dataDowncast').elementToElement({
            model: 'interactiveImageBlock',
            view: (modelElement, { writer: viewWriter }) => {
                return viewWriter.createEmptyElement('section', {
                    class: 'interactive-image-wrapper',
                    'data-src': modelElement.getAttribute('src')
                });
            }
        });

        conversion.for('editingDowncast').elementToElement({
            model: 'interactiveImageBlock',
            view: (modelElement, { writer: viewWriter }) => {
                // <section class="interactive-image-wrapper" data-src="...">
                //     <div class="interactive-button-wrapper">
                //         <Buttons />
                //     </div>
                // </section>
                const src = modelElement.getAttribute('src');

                const section = viewWriter.createContainerElement('section', {
                    class: 'interactive-image-wrapper',
                    'data-src': src
                });

                const img = viewWriter.createEmptyElement('img', { 
                    class: 'interactive-image',
                    src
                });
                viewWriter.insert(viewWriter.createPositionAt(section, 0), img);

                const buttonWrapper = viewWriter.createRawElement('div', {
                    class: 'interactive-button-wrapper'
                }, (domElement) => {
                    buttonRender(src, domElement);
                });

                viewWriter.insert(viewWriter.createPositionAt(section, 1), buttonWrapper);

                return toWidget(section, viewWriter, { label: 'product preview widget' });
            }
        });
    }
}
