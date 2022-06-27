import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

export default class InteractiveImageUI extends Plugin {
    init() {
        const editor = this.editor;
        const t = editor.t;

        editor.ui.componentFactory.add('InteractiveImage', locale => {
            const command = editor.commands.get('addInteractiveImage');

            const buttonView = new ButtonView(locale);

            buttonView.set({
                label: t('Insert Image'),
                icon: imageIcon,
                tooltip: true
            });

            buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

            // Execute the command when the button is clicked (executed).
            this.listenTo(buttonView, 'execute', () => editor.execute('addInteractiveImage'));

            return buttonView;
        });
    }
}