import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {LoginService} from "../shared/service/login.service";
import {ToastrService} from "ngx-toastr";
import {TabIndex} from "../shared/const/const.const";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private service: LoginService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  /** ログイン情報 入力フォーム */
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.min(8)]);

  /**
   * ログインボタン押下イベント
   */
  onClickLogin(): void {
    // 入力チェック（エラーが存在する場合は、後続の処理を中断）
    if (this.validate()) {
      return;
    }

    this.service.login(this.emailControl.value, this.passwordControl.value)
      .then(() => {
        this.toastr.success('ログインしました。', 'ログイン完了');
        this.router.navigate(['/show-container-page', { selectIndex: TabIndex.Route }]);
      })
      .catch(error => {
        this.toastr.error('メールアドレス・パスワードが違うようです。', 'ログイン失敗');
      })
  }

  /**
   * 入力値検証
   * @return true → エラー有り
   */
  validate(): boolean {
    this.emailControl.markAsDirty();
    this.passwordControl.markAsDirty();

    return this.emailControl.invalid || this.passwordControl.invalid;
  }

  ngOnInit(): void {
  }
}
