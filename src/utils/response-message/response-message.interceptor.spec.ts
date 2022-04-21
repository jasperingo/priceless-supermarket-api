import { ResponseMessageInterceptor } from './response-message.interceptor';

describe('AllResponseInterceptor', () => {
  it('should be defined', () => {
    expect(new ResponseMessageInterceptor()).toBeDefined();
  });
});
