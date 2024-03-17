import { Component, OnInit } from '@angular/core';

import { LoginService } from 'app/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import Chart, { ChartConfiguration } from './../../../../../node_modules/chart.js/auto/auto.mjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  account: Account | null = null;
  
  constructor(private accountService: AccountService, private loginService: LoginService) {}
  
  ngOnInit(): void {

 // setup 
 const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Weekly Sales',
    data: [50, 12, 6, 9, 12, 3, 9],
    backgroundColor: [
      'rgba(0, 0, 0, 0.2)'
    ],
    datalabels: {
      align: 'end',
      anchor: 'end'
    },
    borderColor: [
      'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1
  }]
};
//toplables
const topLables={
  id:'topLables',
  afterDataSetsDraw(chart:any,args:any,pluginOptions:any){
    const {ctx,scales:{x,y}}=chart;
    ctx.font='bold 12px';
    ctx.fillStyle='rgba(255,26,104,1)';
    ctx.fillText('19',10,10)

  }
}
// config 
const config = {
  type: 'bar',
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
  plugins:[ChartDataLabels]
};

// render init block
const myChart = new Chart(
  document.getElementById('myChart') as HTMLCanvasElement,
  config as ChartConfiguration
);

// Instantly assign Chart.js version
const chartVersion = document.getElementById('chartVersion');
chartVersion!.innerText = Chart.version;
    this.accountService.identity().subscribe(account => (this.account = account));
  }

  login(): void {
    this.loginService.login();
  }
}
