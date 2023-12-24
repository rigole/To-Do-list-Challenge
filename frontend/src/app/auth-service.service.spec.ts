import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service.service';

describe('AuthServiceService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data', () => {

    const task = service.getAllTask(15);
    expect(task).toBeDefined();
  });
});

