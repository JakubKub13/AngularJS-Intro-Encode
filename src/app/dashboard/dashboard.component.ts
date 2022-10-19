import { Component, OnInit } from '@angular/core';
import { ethers, Signer } from 'ethers';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tokenContractAddress: string;
  balContractAddress: string;
  tokenTotalSupply: string;
  walletAddress: string;
  wallet: ethers.Wallet | undefined;
  etherBalance: string;
  provider: ethers.providers.BaseProvider;

  claimForm = this.fb.group({
    name: [''],
    id: [''],
  });

  mintForm = this.fb.group({
    address: [''],
    amount: [''],
  });

  votePowerForm = this.fb.group({
    address: [''],
  })

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.tokenTotalSupply = "Loading.....";
    this.walletAddress = "Loading.....";
    this.etherBalance = "Loading.....";
    this.tokenContractAddress = "";
    this.balContractAddress= "";
    this.provider = ethers.getDefaultProvider("goerli");
   }

  ngOnInit(): void {
    this.apiService.getContractAddress().subscribe((response) => {
      this.tokenContractAddress = response.result;
    });
    this.apiService.getBalContractAddress().subscribe((response) => {
      this.balContractAddress = response.result;
    })
    this.apiService.getTotalSupply().subscribe((response) => {
      this.tokenTotalSupply = response.result + " Tokens";
    })
    this.wallet = ethers.Wallet.createRandom();
    this.walletAddress = this.wallet.address;
    this.provider.getBalance(this.walletAddress).then((balanceBN) => {
      this.etherBalance = ethers.utils.formatEther(balanceBN) + " ETH";
    });
  }

  request() {
    const body = {name: this.claimForm.value.name, id: this.claimForm.value.id};
    this.apiService.requestTokens(body).subscribe((result) => {console.log(result)});
  }

  mint() {
    const body = {address: this.mintForm.value.address, amount: this.mintForm.value.amount};
    this.apiService.mint(body).subscribe((result) => {console.log(result)})
  }

}
