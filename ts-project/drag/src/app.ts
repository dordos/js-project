import { InputDialog, MediaData, TextData } from './components/dialog/dialog.js';
import { VideoComponent } from './components/page/item/video.js';
import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { Component } from './components/component.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      '#new-image',
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );
    this.bindElementToDialog<MediaSectionInput>(
      '#new-video',
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-note',
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );
    this.bindElementToDialog<TextSectionInput>(
      '#new-todo',
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );

    this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
    this.page.addChild(new NoteComponent('Note Title', 'test'));
    this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
    this.page.addChild(new NoteComponent('Note Title', 'test'));
    this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
    this.page.addChild(new NoteComponent('Note Title', 'test'));

    // const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement;
    // imageBtn.addEventListener('click', () => {
    //   const dialog = new InputDialog();
    //   const inputSection = new MediaSectionInput();

    //   dialog.addChild(inputSection);
    //   dialog.attachTo(dialogRoot);

    //   dialog.setOnCloseListenr(() => {
    //     dialog.removeFrom(dialogRoot);
    //   });
    //   dialog.setOnSubmitListenr(() => {
    //     const image = new ImageComponent(inputSection.title, inputSection.url);
    //     this.page.addChild(image);

    //     dialog.removeFrom(dialogRoot);
    //   });
    // });
  }
  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    inputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const input = new inputComponent();

      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListenr(() => {
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListenr(() => {
        const image = makeSection(input);
        this.page.addChild(image);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
