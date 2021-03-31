import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faClock, faFlag, faHistory, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SessionConfiguration, SessionLanguage } from '../../session.model';

@Component({
  selector: 'app-settings-form',
  templateUrl: './session-configuration-form.component.html',
  styleUrls: ['./session-configuration-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionConfigurationFormComponent implements OnInit, OnDestroy {
  form = this.formBuilder.group({
    language: [],
    roundTimeInSeconds: [],
    roundsToPlay: [],
    maxPlayers: [],
  });

  readonly SessionLanguage = SessionLanguage;
  readonly faClock = faClock;
  readonly faHistory = faHistory;
  readonly faFlag = faFlag;
  readonly faUsers = faUsers;

  private formChangeSubscription = Subscription.EMPTY;

  @Input()
  set sessionConfiguration(value: SessionConfiguration) {
    this.form.setValue(value, { emitEvent: false });
  }

  @Input()
  set isDisabled(value: boolean) {
    if (value) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  @Output()
  sessionConfigurationChange = new EventEmitter<SessionConfiguration>();

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnDestroy(): void {
    this.formChangeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.formChangeSubscription = this.form.valueChanges.subscribe(value => this.sessionConfigurationChange.emit(value));
  }
}
