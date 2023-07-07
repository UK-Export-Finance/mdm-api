import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { catchError, lastValueFrom, Observable, ObservableInput } from 'rxjs';

import { RequestHeaders } from './type/headers.type';

export class HttpClient {
  constructor(private readonly httpService: HttpService) {}

  get<ResponseBody>({
    path,
    headers,
    onError,
  }: {
    path: string;
    headers: RequestHeaders;
    onError: (error: Error) => ObservableInput<never>;
  }): Promise<AxiosResponse<ResponseBody>> {
    return this.responseFrom({ request: this.httpService.get<never>(path, { headers }), onError });
  }

  private async responseFrom<ResponseBody = never>({
    request,
    onError,
  }: {
    request: Observable<AxiosResponse<ResponseBody, any>>;
    onError: (error: Error) => ObservableInput<never>;
  }): Promise<AxiosResponse<ResponseBody, any>> {
    return await lastValueFrom(request.pipe(catchError((error) => onError(error))));
  }
}
