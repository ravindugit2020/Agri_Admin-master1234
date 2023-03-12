import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {StaticsService} from "../../services/statics.service";
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-subs-statics',
  templateUrl: './subs-statics.component.html',
  styleUrls: ['./subs-statics.component.scss']
})
export class SubsStaticsComponent implements OnInit {

  AllFarmers=0;

  Fnatural = 0;
  FChemical = 0;
  FBoth = 0;


  constructor(private substaticsservice:StaticsService) {
  }

  ngOnInit(): void {
    // this.chart?.update();
    this.getBarTypes()
  }


  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 1,
        max:100
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }

  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'>  = {
    labels: [ 'Organic', 'Chemical', 'Both' ],
    datasets: [
      { data: [ 20, 20, 20], label: 'Fertilizers Usage Of Farmers', backgroundColor: ['rgba(8, 144, 61,0.6)','rgba(32, 184, 6,0.6)',], hoverBackgroundColor:['rgba(248, 205, 16,1)',]}
    ]
  };

  getBarTypes(){
    this.substaticsservice.Barpercentage().subscribe(res=>{
      console.log(res.data)

      this.Fnatural = res.data.natural
      this.FChemical = res.data.chemical
      this.FBoth = res.data.both
      this.AllFarmers = res.data.all
      this.barChartData.datasets[0].data = [res.data.natural, res.data.chemical, res.data.both];
      this.chart?.update();
    })

  }

}
