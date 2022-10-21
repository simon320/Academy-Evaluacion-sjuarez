import { Pipe, PipeTransform } from '@angular/core';
import { Like } from '../../posts/interfaces/comments.interface';

@Pipe({
  name: 'likePipe'
})
export class LikePipe implements PipeTransform {

  transform(value: Like[]): string{
    const usersLike = value.map( like => like.username )
    const like = usersLike.join('\n ')
    return like as unknown as string;
  }

}