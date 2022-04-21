import { ReadPermissionGuard } from './read-permission.guard';

describe('PermissionGuard', () => {
  it('should be defined', () => {
    expect(new ReadPermissionGuard()).toBeDefined();
  });
});
