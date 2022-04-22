import { ReadPermissionGuard } from './read-permission.guard';

describe('ReadPermissionGuard', () => {
  it('should be defined', () => {
    expect(new ReadPermissionGuard()).toBeDefined();
  });
});
