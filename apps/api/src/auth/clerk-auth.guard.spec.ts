import { describe, it, expect } from 'vitest';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { ClerkAuthGuard } from './clerk-auth.guard.js';

function makeContext(authHeader?: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        headers: { authorization: authHeader },
      }),
    }),
  } as unknown as ExecutionContext;
}

describe('ClerkAuthGuard', () => {
  it('throws UnauthorizedException when no Authorization header is present', async () => {
    const guard = new ClerkAuthGuard();
    await expect(guard.canActivate(makeContext())).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('throws UnauthorizedException for a garbage bearer token', async () => {
    process.env.CLERK_SECRET_KEY = 'sk_test_placeholder';
    const guard = new ClerkAuthGuard();
    await expect(
      guard.canActivate(makeContext('Bearer not-a-real-token')),
    ).rejects.toThrow(UnauthorizedException);
  });
});