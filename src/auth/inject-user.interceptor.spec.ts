import { InjectUserInterceptor } from './inject-user.interceptor';

describe('InjectUserInterceptor', () => {
  it('should be defined', () => {
    expect(new InjectUserInterceptor()).toBeDefined();
  });
});
