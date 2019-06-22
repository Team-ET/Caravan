import { Input } from '@angular/core';

export class Group {
  @Input() id: number;
  @Input() name: string;
  @Input() location: string;
  @Input() picUrl: string;
}
