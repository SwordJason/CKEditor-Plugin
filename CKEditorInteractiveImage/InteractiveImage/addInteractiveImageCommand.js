import Command from '@ckeditor/ckeditor5-core/src/command';

export default class AddInteractiveImageCommand extends Command {
    execute() {
        const src = prompt('Image URL');
        if (!src) { 
            return;
        }

        this.editor.model.change(writer => {
            this.editor.model.insertContent(writer.createElement('interactiveImageBlock', { src }));
            // this.editor.model.insertContent(createInteractiveImage(writer, imageURL));
        });
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'interactiveImageBlock');

        this.isEnabled = allowedIn !== null;
    }
}

// function createInteractiveImage(writer, imageURL) {

//     const interactiveImage = writer.createElement('interactiveImage');
//     const imageElement = writer.createElement('image', {
//         src: imageURL
//     });
//     writer.append(imageElement, interactiveImage);

//     const interactiveButtons = writer.createElement('interactiveButtons');
//     writer.append(interactiveButtons, interactiveImage);

//     const button = writer.createElement('button', {
//         title: "Click Me"
//     });

//     const button1 = writer.createElement('button', {
//         title: "Click Me"
//     });
//     writer.append(button, interactiveButtons);
//     writer.append(button1, interactiveButtons);

//     // writer.appendElement('paragraph', simpleBoxDescription);

//     return interactiveImage;
// }
