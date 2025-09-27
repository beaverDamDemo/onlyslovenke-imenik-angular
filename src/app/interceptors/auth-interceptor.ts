import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const token = localStorage.getItem('token') ?? '';
  // request = request.clone({
  //   setHeaders: {
  //     Authorization: token ? `Bearer ${token}` : ''
  //   }
  // });
  return next(req);
};
