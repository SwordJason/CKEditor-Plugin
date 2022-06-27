import InteractiveImageEditing from './interactiveImageEditing';
import InteractiveImageUI from './interactiveImageUI';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class InteractiveImage extends Plugin {
    static get requires() {
        return [InteractiveImageEditing, InteractiveImageUI];
    }
}