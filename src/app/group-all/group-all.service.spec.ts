import { TestBed } from '@angular/core/testing';

import { GroupAllService } from './group-all.service';

describe('GroupAllService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupAllService = TestBed.get(GroupAllService);
    expect(service).toBeTruthy();
  });
});
