import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Review } from '../Models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }


  addReview(addReview:any){
    return this.http.post<any>(this.baseApiUrl+'/api/Comment',addReview);
  }

  getReviews( productId:string){
    return this.http.get<Review[]>(this.baseApiUrl + '/api/Comment/'+ productId);
  }

}
