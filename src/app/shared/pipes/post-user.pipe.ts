import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../../user/services/user.service';

@Pipe({
  name: 'postUserName'
})
export class PostUserNamePipe implements PipeTransform {

  constructor( private userServivce: UserService) {}

  transform(value: string): string {

    let username: string;

    this.userServivce.getUserById(value)
      .subscribe({
        next: user => username = user.username,
      })

    return username!;
  }

}