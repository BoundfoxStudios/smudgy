import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
