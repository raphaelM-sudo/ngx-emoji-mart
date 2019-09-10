# ngx-emoji-mart-picker

**This is an unmaintained fork with a few changes to the displayed emoji names of**:

GitHub: [TypeCtrl/ngx-emoji-mart](https://github.com/TypeCtrl/ngx-emoji-mart)

NPM: [@ctrl/ngx-emoji-mart](https://www.npmjs.com/package/@ctrl/ngx-emoji-mart)

The reason for this fork is to be able to use emoticons and short names of emojis within a content editable text area.
So it is possible to write e.g.
  ':)' and replace it with the proper emoji (the unicode 🙂 or any other of emoji-mart's sets)
or
<code>'\*hear-eyes\*'</code> and replace it with 😍 or any set of emojis.

This was also possible in the original, but the pre- and postfix of the displayed emojis in the preview was a colon which was interfering with emoticons e.g.

<code>':o' and ':octopus\:'</code>

or

<code>':o' and ':o)'</code>.

The new indicator for emojis is an asterisk e.g. <code>'\*octopus\*'</code>.

The skin tone indicator remains a colon.

## Changes:

### Emoji

In order to display an emoji as a button use one of the following syntaxes:

```html
<ngx-emoji [emoji]="{ id: 'santa', skin: 3 }" size="16"></ngx-emoji>
<ngx-emoji emoji="*santa*:skin-tone-3:" size="16"></ngx-emoji>
<ngx-emoji emoji="*santa*" set="emojione" size="16"></ngx-emoji>
<ngx-emoji emoji="santa" set="emojione" size="16"></ngx-emoji>
```

#### Emoji Fallback

```ts
emojiFallback = (emoji: any, props: any) => emoji ? `*${emoji.shortNames[0]}*` : props.emoji;
```
