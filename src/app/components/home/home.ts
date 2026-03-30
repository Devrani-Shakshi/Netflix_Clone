// import { Component, inject, OnInit } from '@angular/core';
// import { Header } from '../../core/components/header/header';
// import { Banner } from "../../core/components/banner/banner";
// import { forkJoin, map, Observable } from 'rxjs';
// import { AsyncPipe, CommonModule } from '@angular/common';
// import { Auth } from '../../shared/services/auth.service';
// import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
// import { IVideoContent } from '../../shared/models/video-content.interface';
// import { MovieService } from '../../shared/services/movie.service';

// @Component({
//   selector: 'app-home',
//  standalone: true,
//   imports: [CommonModule, Header, Banner, MovieCarouselComponent],
//   templateUrl: './home.html'
// })

 

// export class Home implements OnInit {

//   auth = inject(Auth) ;
//     movieService = inject(MovieService);
//    name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name ; 
//    userProfilePNG  = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture; 
//     hd  = JSON.parse(sessionStorage.getItem("loggedInUser")!).hd; 
//     email  = JSON.parse(sessionStorage.getItem("loggedInUser")!).email; 

//   bannerDetail$ = new Observable<any>();
//   bannerVideo$ = new Observable<any>();

//   movies: IVideoContent[] = [];
//   tvShows: IVideoContent[] = [];
//   ratedMovies: IVideoContent[] = [];
//   nowPlayingMovies: IVideoContent[] = [];
//   popularMovies: IVideoContent[] = [];
//   topRatedMovies: IVideoContent[] = [];
//   upcomingMovies: IVideoContent[] = [];

//   sources = [
//     this.movieService.getMovies(),
//     this.movieService.getTvShows(),
//     this.movieService.getRatedMovies(),
//     this.movieService.getNowPlayingMovies(),
//     this.movieService.getUpcomingMovies(),
//     this.movieService.getPopularMovies(),
//     this.movieService.getTopRated()
//   ];
//   ngOnInit(): void {
//     forkJoin(this.sources)
//     .pipe(
//       map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated])=>{
//         this.bannerDetail$ = this.movieService.getBannerDetail(movies.results[1].id);
//         this.bannerVideo$ = this.movieService.getBannerVideo(movies.results[1].id);
//         return {movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated}
//       })
//     ).subscribe((res:any)=>{
//       this.movies = res.movies.results as IVideoContent[];
//       console.log(this.movies);
//       debugger;
//       this.tvShows = res.tvShows.results as IVideoContent[];
//         console.log(this.tvShows);
//       this.ratedMovies = res.ratedMovies.results as IVideoContent[];
//         console.log(this.ratedMovies);
//       this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
//       this.upcomingMovies = res.upcoming.results as IVideoContent[];
//       this.popularMovies = res.popular.results as IVideoContent[];
//       this.topRatedMovies = res.topRated.results as IVideoContent[];
//       this.getMovieKey();
//     })
//   }

  

//   getMovieKey() {
//     this.movieService.getBannerVideo(this.movies[0].id)
//     .subscribe(res=>{
//       console.log(res);
//     })
//   }


//   Signout(){
//     sessionStorage.removeItem("loggedInUser");
//     this.auth.signOut();
//   }
// }



import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Header } from '../../core/components/header/header';
import { Banner } from "../../core/components/banner/banner";
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Auth } from '../../shared/services/auth.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { MovieService } from '../../shared/services/movie.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Header, Banner, MovieCarouselComponent],
  templateUrl: './home.html'
})
export class Home implements OnInit {
  auth = inject(Auth);
  movieService = inject(MovieService);

  // Safety check for sessionStorage
  user = JSON.parse(sessionStorage.getItem("loggedInUser") || '{}');
  name = this.user.name || 'Guest';
  userProfilePNG = this.user.picture || '';
  hd = this.user.hd || '';
  email = this.user.email || '';

  bannerDetail$!: Observable<any>;
  bannerVideo$!: Observable<any>;

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

   cdr = inject(ChangeDetectorRef);
  // Define sources as an array of Observables
  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];

  ngOnInit(): void {
    // Wrap each source with catchError so one failure doesn't break the app
    const safeSources = this.sources.map(source =>
      source.pipe(
        catchError(err => {
          console.error('Individual API Error:', err);
          return of({ results: [] }); // Return empty results on error
        })
      )
    );

    forkJoin(safeSources).subscribe((res: any[]) => {
      // res is an ARRAY in the same order as 'sources'
      // [movies, tvShows, nowPlaying, upcoming, popular, topRated]
      
      this.movies = res[0].results as IVideoContent[];
      this.tvShows = res[1].results as IVideoContent[];
      this.nowPlayingMovies = res[2].results as IVideoContent[];
      this.upcomingMovies = res[3].results as IVideoContent[];
      this.popularMovies = res[4].results as IVideoContent[];
      this.topRatedMovies = res[5].results as IVideoContent[];
      this.cdr.detectChanges();

      // Set Banner Data based on the first movie of the 'movies' array
      if (this.movies.length > 0) {
        const bannerId = this.movies[0].id;
        this.bannerDetail$ = this.movieService.getBannerDetail(bannerId);
        this.bannerVideo$ = this.movieService.getBannerVideo(bannerId);
      }

      console.log('All Data Loaded:', res);
    });
  }

  Signout() {
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }
}
