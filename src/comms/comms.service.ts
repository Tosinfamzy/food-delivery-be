import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { User } from 'src/interfaces/User.interface';
import { readFromFile } from 'src/utils/readFromFile';

export interface NextDeliveryResponse {
  title: string;
  message: string;
  totalPrice: string; // Since totalPrice is converted to a fixed precision string
  freeGift: boolean;
}

@Injectable()
export class CommsService {
  private readonly filePath = path.join(process.cwd(), 'data.json');
  private readonly users = readFromFile(this.filePath);
  private pouchPrices = {
    A: 55.5,
    B: 59.5,
    C: 62.75,
    D: 66.0,
    E: 69.0,
    F: 71.25,
  };

  nextDelivery(userId: string): NextDeliveryResponse {
    if (!this.users) {
      throw new Error('No users found');
    }

    const user: User = this.users.find((user: User) => user.id === userId);

    const activeCats = user.cats.filter((cat) => cat.subscriptionActive);

    if (activeCats.length === 0) {
      throw new Error('No active subscriptions for this user');
    }

    const catNames = activeCats.map((cat) => cat.name);
    const formattedCatNames = this.formatCatNames(catNames);

    const totalPrice = this.calculateTotalPrice(activeCats);

    return {
      title: `Your next delivery for ${formattedCatNames}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${formattedCatNames}'s fresh food.`,
      totalPrice: totalPrice.toFixed(2),
      freeGift: totalPrice > 120,
    };
  }
  private formatCatNames(catNames: string[]) {
    if (catNames.length === 1) {
      return catNames[0];
    } else if (catNames.length === 2) {
      return `${catNames[0]} and ${catNames[1]}`;
    } else {
      const [lastCat, ...rest] = catNames.reverse();
      return `${rest.reverse().join(', ')} and ${lastCat}`;
    }
  }

  private calculateTotalPrice(activeCats: any[]) {
    return activeCats.reduce((total, cat) => {
      return (
        total + this.pouchPrices[cat.pouchSize as keyof typeof this.pouchPrices]
      );
    }, 0);
  }
}
