import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Participants} from './participant';

describe('Participant', () => {
  let component: Participants;
  let fixture: ComponentFixture<Participants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Participants],
    }).compileComponents();

    fixture = TestBed.createComponent(Participants);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
