import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH } from '@ukef/constants';

@Injectable()
export class ApiKeyAuthGuard extends AuthGuard(AUTH.STRATEGY) {}
