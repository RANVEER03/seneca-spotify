import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service'
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  album: any; /* Create an "album" property within the class */
  private albumSub: any;
  private routeSub: any;

  constructor(private musicData: MusicDataService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  addToFavourites(trackID:string): void {
    // if (this.musicData.addToFavourites(trackID)) {
    //   this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    // }
    this.musicData.addToFavourites(trackID).subscribe((msg) => {
      console.log(msg);
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    }, (err) => {
      console.log(err);
      this.snackBar.open("Unable to add song to Favourites", "", { duration: 1500 });
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.albumSub = this.musicData.getAlbumById(params['id']).subscribe(data => this.album = data);
    });
  }

  ngOnDestroy(): void {
    this.albumSub.unsubscribe();
    this.routeSub.unsubscribe();
  }
}
