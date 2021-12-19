import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private csrfUrl = 'api/sanctum/csrf-cookie';
  private loginUrl = 'api/auth/login';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  /**
   * ログイン
   * @param email メールアドレス
   * @param password パスワード
   */
  async login(email: string, password: string): Promise<Boolean>{
    await this.http.get(this.csrfUrl).toPromise()
    return this.http.post<Boolean>(this.loginUrl, {email, password}).toPromise();
  }
}
