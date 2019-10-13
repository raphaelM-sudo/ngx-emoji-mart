import { async, inject, TestBed } from '@angular/core/testing';

import { EmojiData } from './data/data.interfaces';
import { EMOJI_COLON, EmojiService } from './emoji.service';

function hasPartiallyMatchingEmoji(emoji1: EmojiData) {
  // Check emoji1 emoticons itself for partial matches
  for (let i = 0; i < emoji1.emoticons.length; i++) {

    const emoticon1 = emoji1.emoticons[i];

    for (let d = i + 1; d < emoji1.emoticons.length; d++) {
      const emoticon2 = emoji1.emoticons[d];

      if (emoticon2 && emoticon1) {
        expect(emoticon2.startsWith(emoticon1)).toBeFalsy(`${emoticon2} interferes with ${emoticon1} !`);
      }
    }
  }
}

function hasPartiallyMatchingEmojis(emoji1: EmojiData, emoji2: EmojiData) {
  // Check emoticons with emoticons
  emoji1.emoticons.forEach(emoticon1 => {

    emoji2.emoticons.forEach(emoticon2 => {

      if (emoticon2 && emoticon1) {
        expect(emoticon2.startsWith(emoticon1)).toBeFalsy(`${emoticon2} interferes with ${emoticon1} !`);
      }
    });
  });
}

function hasPartiallyMatchingEmojisAndShortNames(emoji1: EmojiData, emoji2: EmojiData) {
  let shortNames1: string[] = [];

  if (emoji1.shortNames.length > 0) {
    shortNames1 = emoji1.shortNames;
  }

  let shortNames2: string[] = [];

  if (emoji2.shortNames.length > 0) {
    shortNames2 = emoji2.shortNames;
  }

  // Check emoticons with shortNames
  emoji1.emoticons.forEach(emoticon1 => {

    shortNames2.forEach(shortName2 => {

      if (shortName2 && emoticon1) {

        shortName2 = `${EMOJI_COLON}${shortName2}${EMOJI_COLON}`;

        expect(shortName2.startsWith(emoticon1)).toBeFalsy(`${shortName2} interferes with ${emoticon1} !`);
      }
    });
  });
}

describe('EmojiService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({}).compileComponents();
  }));

  it('has no partially matching emoticons within a single emoji', inject(
    [EmojiService],
    (e: EmojiService) => {

      e.emojis.forEach(emoji1 => {

        if (emoji1) {
          hasPartiallyMatchingEmoji(emoji1);
        }
      });
    },
  ));

  it('has no partially matching emoticons within other emojis', inject(
    [EmojiService],
    (e: EmojiService) => {

      for (let i = 0; i < e.emojis.length; i++) {

        const emoji1 = e.emojis[i];

        for (let d = 0; d < e.emojis.length; d++) {

          if (i !== d) {
            const emoji2 = e.emojis[d];

            if (emoji1 && emoji2) {
              hasPartiallyMatchingEmojis(emoji1, emoji2);
            }
          }
        }
      }
    },
  ));

  it('has no partially matching emoticons with shortnames of other emojis', inject(
    [EmojiService],
    (e: EmojiService) => {

      for (let i = 0; i < e.emojis.length; i++) {

        const emoji1 = e.emojis[i];

        for (let d = 0; d < e.emojis.length; d++) {

          if (i !== d) {
            const emoji2 = e.emojis[d];

            if (emoji1 && emoji2) {
              hasPartiallyMatchingEmojisAndShortNames(emoji1, emoji2);
            }
          }
        }
      }
    },
  ));
});
