import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import { Emoji, EmojiData, EmojiService } from '@nutrify/ngx-emoji-mart-picker/ngx-emoji';

@Component({
  selector: 'emoji-preview',
  template: `
  <div class="emoji-mart-preview" *ngIf="emoji && emojiData">
    <div class="emoji-mart-preview-emoji">
      <ngx-emoji
        [emoji]="emoji"
        [size]="38"
        [isNative]="emojiIsNative"
        [skin]="emojiSkin"
        [size]="emojiSize"
        [set]="emojiSet"
        [sheetSize]="emojiSheetSize"
        [backgroundImageFn]="emojiBackgroundImageFn">
      </ngx-emoji>
    </div>

    <div class="emoji-mart-preview-data">
      <div class="emoji-mart-preview-name">{{ emojiData.name }}</div>
      <div *ngIf="!displayEmoticonOnly || listedEmoticons.length === 0" class="emoji-mart-preview-shortnames">
        <span class="emoji-mart-preview-shortname" *ngFor="let short_name of emojiData.shortNames">
          *{{ short_name }}*
        </span>
      </div>
      <div class="emoji-mart-preview-emoticons">
        <span class="emoji-mart-preview-emoticon" *ngFor="let emoticon of listedEmoticons">
          {{ emoticon }}
        </span>
      </div>
    </div>
  </div>

  <div class="emoji-mart-preview" *ngIf="!emoji">
    <div class="emoji-mart-preview-emoji">
      <ngx-emoji *ngIf="idleEmoji && idleEmoji.length"
        [isNative]="emojiIsNative"
        [skin]="emojiSkin"
        [set]="emojiSet"
        [emoji]="idleEmoji"
        [backgroundImageFn]="emojiBackgroundImageFn">
      </ngx-emoji>
    </div>

    <div class="emoji-mart-preview-data">
      <span class="emoji-mart-title-label">{{ title }}</span>
    </div>

    <div class="emoji-mart-preview-skins">
      <emoji-skins [skin]="emojiSkin" (changeSkin)="skinChange.emit($event)" [i18n]="i18n"></emoji-skins>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class PreviewComponent implements OnChanges {
  @Input() title?: string;
  @Input() emoji: any;
  @Input() idleEmoji: any;
  @Input() i18n: any;
  @Input() emojiIsNative?: Emoji['isNative'];
  @Input() emojiSkin?: Emoji['skin'];
  @Input() emojiSize?: Emoji['size'];
  @Input() emojiSet?: Emoji['set'];
  @Input() emojiSheetSize?: Emoji['sheetSize'];
  @Input() emojiBackgroundImageFn?: Emoji['backgroundImageFn'];
  @Input() displayEmoticonOnly = false;
  @Output() skinChange = new EventEmitter<number>();
  emojiData: Partial<EmojiData> = {};
  listedEmoticons?: string[];

  constructor(
    public ref: ChangeDetectorRef,
    private emojiService: EmojiService,
  ) {}

  ngOnChanges() {
    if (!this.emoji) {
      return;
    }
    this.emojiData = this.emojiService.getData(this.emoji, this.emojiSkin, this.emojiSet) as EmojiData;
    const knownEmoticons: string[] = [];
    const listedEmoticons: string[] = [];
    const emoitcons = this.emojiData.emoticons || [];
    emoitcons.forEach((emoticon: string) => {
      if (knownEmoticons.indexOf(emoticon.toLowerCase()) >= 0) {
        return;
      }
      knownEmoticons.push(emoticon.toLowerCase());
      listedEmoticons.push(emoticon);
    });
    this.listedEmoticons = listedEmoticons;
  }
}
