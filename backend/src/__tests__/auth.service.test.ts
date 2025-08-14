import { AuthService } from '../services/auth.service';

jest.mock('../config/db', () => ({
  query: jest.fn()
}));

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});