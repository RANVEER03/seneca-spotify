import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites: Array<any> = [];

  private favouriteSub: Subscription | any;
  private removeSub: Subscription | any;

  constructor(private musicData: MusicDataService) { 
  }

  ngOnInit(): void {
    this.favouriteSub = this.musicData.getFavourites().subscribe(data=>{
      this.favourites = data.tracks;
    });
  }

  removeFromFavourites(id: string){
    this.removeSub = this.musicData.removeFromFavourites(id).subscribe(data=>{
      this.favourites = data.tracks;
    });

  }

  ngOnDestroy(): void{
    this.favouriteSub.unsubscribe();
    if (this.removeSub) this.removeSub.unsubscribe();
  }

}
