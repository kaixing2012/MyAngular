import { Injectable } from '@angular/core';
import { ApiData } from '@shared/models/api-data.model';
import { Post } from '@shared/models/post.model';
import { PostGetRequest } from '@shared/requests/post.request';
import { ApiService } from '@shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class PostService {

  constructor(
    private readonly apiService: ApiService
  ) { }

  getPosts(pageNum: string): Observable<ApiData<Post>>{
    const postRequest = new PostGetRequest(pageNum);
    return this.apiService.request<Post>(postRequest, Post);
  }
}
