import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInformationComponent implements OnInit {
  form = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(private readonly playerService: PlayerService, private readonly router: Router, private readonly formBuilder: FormBuilder) {}

  submit(): void {
    this.playerService.register$(this.form.value.name).subscribe({
      error: (error) => console.log('scheißdreck', error),
      complete: () => this.router.navigate(['/game/lobby']),
    });
  }

  ngOnInit(): void {
    this.playerService.playerName$.subscribe((name) => this.form.patchValue({ name }));
  }
}
