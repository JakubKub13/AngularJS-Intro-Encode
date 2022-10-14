import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  walletAddress: string;
  wallet: ethers.Wallet | undefined;

  constructor() {
    this.walletAddress = "Loading.....";
   }

  ngOnInit(): void {
    this.wallet = ethers.Wallet.createRandom();
    this.walletAddress = this.wallet.address;
  }
}
