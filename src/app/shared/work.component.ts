import { Component, OnInit } from '@angular/core';

// Simulates an expensive component: blocks the main thread once, when it's created.
@Component({
  selector: 'app-work',
  template: '',
})
export class WorkComponent implements OnInit {
  private result = 0;

  ngOnInit() {
    for (let i = 0; i < 5_000_000; i++) {
      // pretend to do work;
      this.result += Math.sqrt(i);
    }
  }
}
