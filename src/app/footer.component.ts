import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer mb-4 mt-5">
      Demo using Angular {{ version }}
      <br />
      Released under the
      <a href="https://github.com/raphaelM-sudo/ngx-emoji-mart/blob/master/LICENSE"
        >MIT</a
      >
      license -
      <a href="https://github.com/raphaelM-sudo/ngx-emoji-mart">View source</a>
    </footer>
  `,
  styles: [
    `
      .footer {
        line-height: 2;
        text-align: center;
        font-size: 12px;
        color: #999;
      }
    `,
  ],
})
export class FooterComponent {
  version = VERSION.full;
}
