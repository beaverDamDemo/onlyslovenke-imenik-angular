import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IconHeartComponent } from '../icon-heart/icon-heart.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IconMapPinComponent } from '../icon-map-pin/icon-map-pin.component';
import { IconCalendarComponent } from '../icon-calendar/icon-calendar.component';
import { IconVerifiedComponent } from '../icon-verified/icon-verified.component';
import { IconExternalLinkComponent } from '../icon-external-link/icon-external-link.component';
import { ContentCreator } from '../../models/content-creator.model';

@Component({
  selector: 'app-performer-card',
  templateUrl: './performer-card.component.html',
  imports: [IconHeartComponent, CurrencyPipe, IconExternalLinkComponent, IconMapPinComponent, IconCalendarComponent, IconVerifiedComponent, CommonModule]
})
export class ContentCreatorCardComponent implements OnInit {
  @Input() performer!: ContentCreator;
  @Input() showDealBadge = false;
  @Input() layout: 'card' | 'row' = 'card';

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
    this.isFavorite = !this.isFavorite;
    throw new Error('Not implemented yet');
    /**
     * ! not implemented yet
     */
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
