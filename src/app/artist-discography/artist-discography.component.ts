import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  artist:any;
  albums:any;

  private paramSub: Subscription | undefined;
  private artistIdSub:  Subscription | undefined;
  private albumArtistSub:  Subscription | undefined;

  constructor(private musicData: MusicDataService, private activatedRoute: ActivatedRoute) { 
  }
   
  ngOnInit(): void {
       this.paramSub = this.activatedRoute.params.subscribe(id=>{

        this.artistIdSub = this.musicData.getArtistById(id['id']).subscribe(artist=>{
          this.artist = artist
        });
        
        this.albumArtistSub = this.musicData.getAlbumsByArtistId(id['id']).subscribe(data => {
          this.albums = data.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index)
        });
       });
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
    this.artistIdSub?.unsubscribe();
    this.albumArtistSub?.unsubscribe();
  }
}
