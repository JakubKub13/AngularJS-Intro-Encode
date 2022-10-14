import { Component, OnInit } from '@angular/core';
import { ethers, Signer } from 'ethers';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tokenContractAddress: string;
  walletAddress: string;
  wallet: ethers.Wallet | undefined;
  etherBalance: string;
  provider: ethers.providers.BaseProvider;

  constructor(private apiService: ApiService) {
    this.walletAddress = "Loading.....";
    this.etherBalance = "Loading.....";
    this.tokenContractAddress = "";
    this.provider = ethers.getDefaultProvider("goerli");
   }

  ngOnInit(): void {
    this.apiService.getContractAddress().subscribe((response) => {
      this.tokenContractAddress = response;
    });
    this.wallet = ethers.Wallet.createRandom();
    this.walletAddress = this.wallet.address;
    this.provider.getBalance(this.walletAddress).then((balanceBN) => {
      this.etherBalance = ethers.utils.formatEther(balanceBN) + " ETH";
    });
  }

  doAction() {
    this.wallet = ethers.Wallet.createRandom();
    this.walletAddress = this.wallet.address;
  }
}
