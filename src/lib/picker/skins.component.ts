import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Emoji } from '@nutrify/ngx-emoji-mart-picker/ngx-emoji';

@Component({
  selector: 'emoji-skins',
  template: `
    <section
      class="emoji-mart-skin-swatches"
      [class.emoji-mart-skin-swatches-opened]="opened"
    >
      <span
        *ngFor="let skinTone of skinTones"
        class="emoji-mart-skin-swatch"
        [class.emoji-mart-skin-swatch-selected]="skinTone === skin"
      >
        <span
          (click)="this.handleClick(skinTone)"
          (keyup.enter)="handleClick(skinTone)"
          (keyup.space)="handleClick(skinTone)"
          class="emoji-mart-skin emoji-mart-skin-tone-{{ skinTone }}"
          role="button"
          [tabIndex]="tabIndex(skinTone)"
          [attr.aria-hidden]="!isVisible(skinTone)"
          [attr.aria-pressed]="pressed(skinTone)"
          [attr.aria-haspopup]="!!isSelected(skinTone)"
          [attr.aria-expanded]="expanded(skinTone)"
          [attr.aria-label]="i18n.skintones[skinTone]"
          [title]="i18n.skintones[skinTone]"
        ></span>
      </span>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class SkinComponent {
  /** currently selected skin */
  @Input() skin?: Emoji['skin'];
  @Input() i18n: any;
  @Output() changeSkin = new EventEmitter<number>();
  opened = false;
  skinTones = [1, 2, 3, 4, 5, 6];

  toggleOpen() {
    this.opened = !this.opened;
  }

  isSelected(skinTone: Emoji['skin']): boolean {
    return skinTone === this.skin;
  }

  isVisible(skinTone: Emoji['skin']): boolean {
    return this.opened || this.isSelected(skinTone);
  }

  pressed(skinTone: Emoji['skin']) {
    return this.opened ? !!this.isSelected(skinTone) : '';
  }

  tabIndex(skinTone: Emoji['skin']) {
    return this.isVisible(skinTone) ? '0' : '';
  }

  expanded(skinTone: Emoji['skin']) {
    return this.isSelected(skinTone) ? this.opened : '';
  }

  handleClick(skin: number) {
    if (!this.opened) {
      this.opened = true;
      return;
    }
    this.opened = false;
    if (skin !== this.skin) {
      this.changeSkin.emit(skin);
    }
  }
}
