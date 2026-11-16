import { isPlatformServer } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';

// Simulates an expensive component: blocks the main thread once, when it's created.
@Component({
  selector: 'app-work',
  template: '',
})
export class WorkComponent implements OnInit {
  private result = 0;
  private isServer = isPlatformServer(inject(PLATFORM_ID));

  ngOnInit() {
    if (this.isServer) return;
    for (let i = 0; i < 5_000_000; i++) {
      // pretend to do work;
      this.result += Math.sqrt(i);
    }
  }
}
