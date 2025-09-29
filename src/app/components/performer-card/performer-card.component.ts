import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Performer } from '../performer-directory/performer-directory.component';
import { IconHeartComponent } from '../icon-heart/icon-heart.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-performer-card',
  templateUrl: './performer-card.component.html',
  imports: [IconHeartComponent, CurrencyPipe]
})
export class PerformerCardComponent implements OnInit {
  @Input() performer!: Performer;
  @Input() showDealBadge = false;

  isFavorite = false;
  user: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    // this.user = this.auth.getUser();
    // if (this.user) {
    //   this.isFavorite = dataStore.getUserFavorites(this.user.id).includes(this.performer.id);
    // }
  }

  handleFavoriteToggle(): void {
    if (!this.user) return;

    // if (this.isFavorite) {
    //   dataStore.removeFromFavorites(this.user.id, this.performer.id);
    //   this.isFavorite = false;
    // } else {
    //   dataStore.addToFavorites(this.user.id, this.performer.id);
    //   this.isFavorite = true;
    // }
  }

  handleVisitProfile(): void {
    window.open(this.performer.onlyfansUrl, '_blank', 'noopener,noreferrer');
  }

  get currentPrice(): number {
    return this.performer.isDiscounted && this.performer.discountPrice
      ? this.performer.discountPrice
      : this.performer.price;
  }

  get hasDiscount(): boolean {
    return !!this.performer.isDiscounted && !!this.performer.discountPrice;
  }
}
