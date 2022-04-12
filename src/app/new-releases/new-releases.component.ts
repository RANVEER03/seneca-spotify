import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases:any;
  private subscribe: Subscription | undefined;

  constructor(private releaseData : MusicDataService) {   
   }

  ngOnInit(): void {
        this.subscribe = this.releaseData.getNewReleases().subscribe(data=>{
          this.releases = data.albums.items;
        });
  }

  ngOnDestroy(): void{
    this.subscribe?.unsubscribe();
  }
}
