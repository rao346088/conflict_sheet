import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,ParamMap ,Router } from '@angular/router';

@Component({
  selector: 'app-master-lk-dtls',
  templateUrl: './master-lk-dtls.component.html',
  styleUrls: ['./master-lk-dtls.component.css']
})
export class MasterLkDtlsComponent implements OnInit {

  public MLType ;
  public RellistId;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

     this.route.paramMap.subscribe((params: ParamMap) => {
     let id = Number(params.get('id'))
     this.RellistId = id
    });
 
  }

  goPrevious() 
  {
    let previousId = this.RellistId - 1;
    this.router.navigate(['/master-lk-dtls', previousId]);
  }

  goNext() {
    let nextId = this.RellistId + 1;
    this.router.navigate(['/master-lk-dtls', nextId]);
  }

  gotoMasterLookup() {
    let selectedId = this.RellistId ? this.RellistId: null;
   // this.router.navigate(['/master-lk-dtls', {id: selectedId}]);   
   this.router.navigate(['../', { id: selectedId }], { relativeTo: this.route });
  }
  

}
