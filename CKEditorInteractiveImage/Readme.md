Pre-Require Condition:
1. CKEditor is using 5
2. npm & webpack is required.

Step 1:
cd ./CKEditorDemo
npm install
webpack --mode development

Step 2:
open index.html in your browser.

How to change the button region:
1. open app.js in your IDE
2. you may found configuration under 'interactiveImage';
3. 'buttonRender' is a call back function that will give you current image src & Parent DomElement.
4. You could add any hot zone in DomElement as a child dom element.
5. 'interactiveImageButton.js' is a simple of how to create it.