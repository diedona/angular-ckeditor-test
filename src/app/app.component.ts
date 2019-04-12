import { Component, OnInit } from '@angular/core';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import MyCustomUploadAdapterPlugin from './test';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-ckeditor-test';
  Editor = DecoupledEditor;
  config = { extraPlugins: [MyCustomUploadAdapterPlugin] }

  ngOnInit(): void {
    //console.log(Base64UploadAdapter);
  }

  public onReady(editor) {
    //console.log(editor);

    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
}
