import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule} from '@angular/material/table'; 
import { MatSortModule} from '@angular/material/sort'; 
import { MatPaginatorModule} from '@angular/material/paginator'; 
import { ScrollingModule} from '@angular/cdk/scrolling';
import { HttpClientModule} from '@angular/common/http';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatMenuModule} from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { NgxSpinnerModule } from "ngx-spinner";



const Importcomp = [MatButtonModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  ScrollingModule,
  HttpClientModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  BrowserAnimationsModule,
  FormsModule ,
  MatMenuModule,
  MatSelectModule,
  MatToolbarModule,
  MatTabsModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  NgxSpinnerModule
 
  

]

@NgModule({
  
  imports: [Importcomp ],
  exports: [Importcomp]
})
export class ImportModule { }
