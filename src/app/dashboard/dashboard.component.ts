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
  voteReceipt: string;
  mintReceipt: string;
  proposal: string;

  claimForm = this.fb.group({
    name: [''],
    id: [''],
  });

  mintForm = this.fb.group({
    address: [''],
    amount: [''],
  });

  voteForm = this.fb.group({
    proposalIndex: [''],
    amount: [''],
  })

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.tokenTotalSupply = "Loading.....";
    this.walletAddress = "Loading.....";
    this.etherBalance = "Loading.....";
    this.tokenContractAddress = "";
    this.balContractAddress= "";
    this.provider = ethers.getDefaultProvider("goerli");
    this.voteReceipt = "";
    this.mintReceipt = "";
    this.proposal = "Loading......"
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
    this.apiService.getProposals().subscribe((response) => { this.proposal = response.result })
  }

  request() {
    const body = {name: this.claimForm.value.name, id: this.claimForm.value.id};
    this.apiService.requestTokens(body).subscribe((result) => {console.log(result)});
  }
// Debug
  async mint() {
    const body = {
      address: this.mintForm.value.address,
      amount: this.mintForm.value.amount,
    };
    console.log(body);
    this.apiService.mint(body).subscribe((response) => {
      console.log(response.result);
      this.mintReceipt = response.result;
    });
  }

  async vote() {
    const body = {
      proposalIndex: this.voteForm.value.proposalIndex,
      amount: this.voteForm.value.amount,
    };
    console.log(body);
    this.apiService.vote(body).subscribe((response) => {
      console.log(response.result);
      this.voteReceipt = response.result;
    });
  }

}
