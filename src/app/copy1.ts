<mat-toolbar-row class="text-center" ml-2 color='Accent'>
  <h2 >Object_List_Form</h2>
</mat-toolbar-row>
<div class="container-fluid" style="background-color: azure;">
<form  [formGroup]="ConflictsheetForm"  (ngSubmit)="onSubmit()" novalidate>
 
<!-----------------------------------Form group ----------------------------->
<div class="form-group form-row ">  
<!-----------------------------------Member Name----------------------------->
  <div class="col-2 container-fluid">
    <label class="label">MemberName</label>
    <input type="text" [class.is-invalid]="MemberName.invalid && MemberName.touched" formControlName="MemberName" class="form-control">
    <div *ngIf="MemberName.invalid && MemberName.touched">
      <small class="text-danger" *ngIf="MemberName.errors?.required">MemberName is required</small>
      <small class="text-danger" *ngIf="MemberName.errors?.minlength">MemberName must be at least 3 characters</small>
      <small class="text-danger" *ngIf="MemberName.errors?.maxlength">MemberName can't be more than 8 characters</small>
      <small class="text-danger" *ngIf="duplicate==true"> Duplicate not allowed</small>
      <small class="text-danger" *ngIf="ConflictsheetForm.errors?.inValid">{{MemberName.errors?.PstepName.value}} Pstep does not contain PR at the end</small>
     </div>
  </div>
<!-----------------------------------Gen Name----------------------------->
  <div class="col-10 container-fluid">
  <label class="label">GenName</label>
  <input type="text" [class.is-invalid]="GenName.invalid && GenName.touched" formControlName="GenName" class="form-control">
    <div *ngIf="GenName.invalid && GenName.touched">
      <small class="text-danger" *ngIf="GenName.errors?.required">GenName is required</small>
      <small class="text-danger" *ngIf="GenName.errors?.minlength">GenName must be at least 10 characters</small>
      <small class="text-danger" *ngIf="GenName.errors?.maxlength">GenName can't be more than 35 characters</small>
    </div>
  </div>
</div>         <!--div form group end-->
<!-----------------------------------Form group ----------------------------->
<div class="form-group form-row ">  
<!-----------------------------------Type----------------------------->
  <div class="col-2 container-fluid">
    <label class="label">Type</label>
    <select  class="custom-select" (blur)="validateType(Type.value)" (change)="validateType(Type.value)" [class.is-invalid]="Type.invalid && Type.touched" formControlName="Type" class="form-control">
      <small class="text-danger" *ngIf="Type.errors?.required">Type is required</small>
      <small class="text-danger" *ngIf="Type.errors?.default">Type is required</small>
      <option value ="default" >Type </option>
      <option *ngFor='let type of Lookup.LType '>{{ type }}
    </select>
     <div *ngIf="Type.invalid && Type.touched">
     </div>
  </div>

  <!-----------------------------------Project_Name----------------------------->
  <div class="col-2 container-fluid">
    <label class="label">Project_Name</label>
    <select  class="custom-select" (blur)="validateType(Project_Name.value)" (change)="validateType(Project_Name.value)" [class.is-invalid]="Project_Name.invalid && Project_Name.touched" formControlName="Project_Name" class="form-control">
      <small class="text-danger" *ngIf="Project_Name.errors?.required">Project_Name is required</small>
      <small class="text-danger" *ngIf="Project_Name.errors?.default">Project_Name is required</small>
     
      <option value ="default" >Project_Name </option>
      <option *ngFor='let Project_Name of Lookup.LProject_Name '>{{ Project_Name }}
    </select>
     <div *ngIf="Project_Name.invalid && Project_Name.touched">
     </div>
  </div>

  <!-----------------------------------Release----------------------------->
  <div class="col-2 container-fluid">
    <label class="label">Release #</label>
    <select  class="custom-select" (blur)="validateType(Release.value)" (change)="validateType(Release.value)" [class.is-invalid]="Release.invalid && Release.touched" formControlName="Release" class="form-control">
      <small class="text-danger" *ngIf="Release.errors?.required">Release # is required</small>
      <small class="text-danger" *ngIf="Release.errors?.default">Release #  is required</small>
      <option value ="default" >Release </option>
      <option *ngFor='let Release of Lookup.LRelease '>{{ Release }}
    </select>
     <div *ngIf="Release.invalid && Release.touched">
     </div>
  </div>
  <!-----------------------------------Change_Type----------------------------->
  <div class="col-2 container-fluid">
    <label class="label">Change_Type</label>
    <select  class="custom-select" (blur)="validateType(Change_Type.value)" (change)="validateType(Change_Type.value)" [class.is-invalid]="Change_Type.invalid && Change_Type.touched" formControlName="Change_Type" class="form-control">
      <small class="text-danger" *ngIf="Change_Type.errors?.required">Change_Type is required</small>
      <small class="text-danger" *ngIf="Change_Type.errors?.default">Change_Type  is required</small>
      <option value ="default" >Change_Type </option>
      <option *ngFor='let Change_Type of Lookup.LChange_Type '>{{ Change_Type }}
    </select>
     <div *ngIf="Change_Type.invalid && Change_Type.touched">
     </div>
  </div>

  <!-----------------------------------Developer----------------------------->
  <div class="col-2 container-fluid">
    <label class="label">Developer</label>
    <select  class="custom-select" (blur)="validateType(Developer.value)" (change)="validateType(Developer.value)" [class.is-invalid]="Developer.invalid && Developer.touched" formControlName="Developer" class="form-control">
      <small class="text-danger" *ngIf="Developer.errors?.required">Developer is required</small>
      <small class="text-danger" *ngIf="Developer.errors?.default">Developer  is required</small>
      <option value ="default" >Developer </option>
      <option *ngFor='let Developer of Lookup.LDeveloper '>{{ Developer }}
    </select>
     <div *ngIf="Developer.invalid && Developer.touched">
     </div>
  </div>

   <!-----------------------------------CCID----------------------------->
   <div class="col-2 container-fluid">
    <label class="label">CCID</label>
    <select  class="custom-select" (blur)="validateType(CCID.value)" (change)="validateType(CCID.value)" [class.is-invalid]="CCID.invalid && CCID.touched" formControlName="CCID" class="form-control">
      <small class="text-danger" *ngIf="CCID.errors?.required">CCID is required</small>
      <small class="text-danger" *ngIf="CCID.errors?.default">CCID  is required</small>
      <option value ="default" >CCID </option>
      <option *ngFor='let CCID of Lookup.LCCID '>{{ CCID }}
    </select>
     <div *ngIf="CCID.invalid && CCID.touched">
     </div>
  </div>
</div>         <!--div form group end-->
<!-----------------------------------Alternate Email----------------------------->
<!--    <button type="button" class="btn btn-secondary btn-sm m-2" (click)="addAlternateEmail()">Add e-mail</button>
    <div formArrayName="alternateEmails" *ngFor="let email of alternateEmails.controls; let i=index">
      <input type="text" class="form-control my-1" [formControlName]="i">
    </div>--> 
<!-----------------------------------Trialer----------------------------->
  <button 
    class="btn btn-primary ml-2"   
    [disabled]="ConflictsheetForm.invalid || Loadid>0 "
    type="submit">Add Element
  </button>

  <button 
    (click)="Updelement(Loadid)" 
    class="btn btn-secondary btn-sm m-2"
    *ngIf="Loadid>0" 
    [disabled]="ConflictsheetForm.invalid" 
    type="button"
    >Update Element
  </button>

  <button 
        (click)="Loadform(0,' ',' ',' ',' ',' ',' ',' ',' ')"
          class="btn btn-secondary btn-sm m-2"
          *ngIf="Loadid>0" 
          [disabled]="ConflictsheetForm.invalid" 
          type="button"
          >Cancel update 
  </button>
 {{ConflictsheetForm.value | json}}

  </form>
 
</div>
<!------------------------------------------------------------------------->
<!-------------------------Mat table--------------------------------------->
<!------------------------------------------------------------------------->
<!--<nav>
<a routerLink="/endvor-list" routerLinkActive="active">Endvor-List</a>
<a routerLink="/master-lookup" routerLinkActive="active">Masterlookup   </a>
</nav>-->


<mat-toolbar-row class="text-center" ml-2 color='Accent'>
  <h2 >Object_List_Data</h2>
</mat-toolbar-row>

<div class="mat-elevation-z8" style="background-color: azure;">
  <mat-table class="table table-striped" style="background-color: azure;" [dataSource]="dataSource" matSort >
      <!-- Id -->
    <ng-container matColumnDef="id">
        <mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="'w-03'">  ID </mat-header-cell>
        <mat-cell *matCellDef="let Object;let i = index" [ngClass]="'w-03'"> {{i + 1}} </mat-cell>
    </ng-container>

      <!-- Member Name -->
    <ng-container matColumnDef="MemberName">
     <mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="'w-05'">
      <mat-form-field >
        
        <input matInput  (keyup)="MemberFilter($event.target.value)" (focus)="setupFilter('MemberName')" placeholder="MemberName" >
      </mat-form-field>   
    </mat-header-cell>
      <mat-cell *matCellDef="let Object" [ngClass]="'w-05'" > {{Object.MemberName}} </mat-cell>
    </ng-container>

       <!--Filter particular column-->  
    <!-- <ng-container matColumnDef="MemberName">  
      <mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="'w-05'">
         <mat-cell *matCellDef="let Object" [ngClass]="'w-10'" > {{Object.MemberName}} </mat-cell>
         <button mat-button class="btn-toggle" [matMenuTriggerFor]="menu">
          <mat-icon>keyboard_arrow_down</mat-icon>
        </button>
        <mat-menu #menu>
          <div mat-menu-item mat-filter-item [disableRipple]="true" class="menu-title">
            MemberName
          </div>

          <div mat-menu-item mat-filter-item [disableRipple]="true">
            <mat-form-field>
              <mat-select [panelClass]="'mat-elevation-z10'" placeholder='Conditions' [(value)]="searchCondition.MemberName">
                 <mat-option *ngFor="let  condition of conditionsList" [value]="condition.value">{{condition.label}}</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <div mat-menu-item mat-filter-item [disableRipple]="true">
            <mat-form-field>
              <input matInput placeholder="Value" [(ngModel)]="searchValue.MemberName">
            </mat-form-field>
          </div>

          <div mat-menu-item mat-filter-item [disableRipple]="true">
            <button mat-raised-button (click)="clearColumn('MemberName')">Clear</button>
            <button mat-raised-button color="primary" (click)="applyFilter()">Search</button>
          </div>
      </mat-menu>
    </mat-header-cell>
    </ng-container>-->

   <!--Filter particular column-->
    <!-- Gen Name Column -->
    <ng-container matColumnDef="GenName">
        <mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="'w-35'"> GenName </mat-header-cell>
        <mat-cell *matCellDef="let Object" [ngClass]="'w-35'"> {{Object.GenName}} </mat-cell>
      </ng-container>
  
    <!-- Object Type -->
   <ng-container matColumnDef="Type">
      <mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="'w-05'" > 
        <mat-form-field>
            <mat-select multiple [panelClass]="'mat-elevation-z10'"placeholder="Type"  
                       (focus)="setupFilter1('Type')" [(value)] = "Selected_Type" (selectionChange)="TypeFilter(Selected_Type)">
             <mat-option  *ngFor="let type of Lookup.LType" [value]="type">{{ type }}</mat-option>
            </mat-select>
        </mat-form-field> 
      </mat-header-cell>
      <mat-cell *matCellDef="let Object" [ngClass]="'w-05'"> {{Object.Type}} </mat-cell>
    </ng-container>

    <!-- Project_Name -->
   <ng-container matColumnDef="Project_Name">
    <mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="'w-10'" > 
      <mat-form-field>
        <mat-select  [panelClass]="'mat-elevation-z10'" placeholder="Project_Name"  
                       (focus)="setupFilter3('Project_Name')" (selectionChange)="Project_NameFilter($event.source.selected.viewValue)">
              <mat-option  *ngFor="let type of Lookup.LProject_Name" [value]="type.MLName">
                {{ type.MLName }}
              </mat-option>
        </mat-select>
      </mat-form-field>  
    </mat-header-cell>
    <mat-cell *matCellDef="let Object" [ngClass]="'w-10'"> {{Object.Project_Name}} </mat-cell>
  </ng-container>

  <!-- Release -->
  <ng-container matColumnDef="Release">
    <mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="'w-10'" > 
      <mat-form-field>
        <mat-select  [panelClass]="'mat-elevation-z10'" placeholder="Release"  
                       (focus)="setupFilter4('Release')" (selectionChange)="ReleaseFilter($event.source.selected.viewValue)">
              <mat-option  *ngFor="let type of Lookup.LRelease" [value]="type.MLName">
                {{ type.MLName }}
              </mat-option>
        </mat-select>
      </mat-form-field>  
    </mat-header-cell>
    <mat-cell *matCellDef="let Object" [ngClass]="'w-10'"> {{Object.Release}} </mat-cell>
  </ng-container>

   <!-- Change_Type -->
   <ng-container matColumnDef="Change_Type">
    <mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="'w-05'" > 
      <mat-form-field>
        <mat-select  [panelClass]="'mat-elevation-z10'" placeholder="Change_Type"  
                       (focus)="setupFilter5('Change_Type')" (selectionChange)="ReleaseFilter($event.source.selected.viewValue)">
              <mat-option  *ngFor="let type of Lookup.LChange_Type" [value]="type.MLName">
                {{ type.MLName }}
              </mat-option>
        </mat-select>
      </mat-form-field>  
    </mat-header-cell>
    <mat-cell *matCellDef="let Object" [ngClass]="'w-05'"> {{Object.Change_Type}} </mat-cell>
  </ng-container>

  <!-- Developer -->
  <ng-container matColumnDef="Developer">
    <mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="'w-10'" > 
      <mat-form-field>
        <mat-select  [panelClass]="'mat-elevation-z10'" placeholder="Developer"  
                       (focus)="setupFilter6('Developer')" (selectionChange)="DeveloperFilter($event.source.selected.viewValue)">
              <mat-option  *ngFor="let type of Lookup.LDeveloper" [value]="type.MLName">
                {{ type.MLName }}
              </mat-option>
        </mat-select>
      </mat-form-field>  
    </mat-header-cell>
    <mat-cell *matCellDef="let Object" [ngClass]="'w-10'"> {{Object.Developer}} </mat-cell>
  </ng-container>

  <!-- CCID -->
  <ng-container matColumnDef="CCID">
    <mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="'w-15'" > 
      <mat-form-field>
        <mat-select  [panelClass]="'mat-elevation-z10'" placeholder="CCID"  
                       (focus)="setupFilter7('CCID')" (selectionChange)="CCIDFilter($event.source.selected.viewValue)">
              <mat-option  *ngFor="let type of Lookup.LCCID" [value]="type.MLName">
                {{ type.MLName }}
              </mat-option>
        </mat-select>
      </mat-form-field>  
    </mat-header-cell>
    <mat-cell *matCellDef="let Object" [ngClass]="'w-15'"> {{Object.CCID}} </mat-cell>
  </ng-container>

     <!-- Conflict? -->
   <ng-container matColumnDef="Conflict">
    <mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="'w-05'"> 
      <mat-form-field >
        <mat-select   [panelClass]="'mat-elevation-z2'" placeholder="Conflict"  
                       (focus)="setupFilter2('Conflict')" (selectionChange)="ConflictFilter($event.source.selected.viewValue)">
              <mat-option *ngFor="let type of LConflict" [value]="type">
                {{ type }}
              </mat-option>
        </mat-select>
      </mat-form-field>  
    </mat-header-cell>
    <mat-cell *matCellDef="let Object" [ngClass]="'w-05'"> {{Object.Conflict}} </mat-cell>
  </ng-container>

     <!-- MissingInEndevor? -->
     <ng-container matColumnDef="MissingInEndevor">
      <mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="'w-05'"> 
        <mat-form-field >
          <mat-select   [panelClass]="'mat-elevation-z2'" placeholder="MissingInEndevor"  
                         (focus)="setupFilter2('MissingInEndevor')" (selectionChange)="MissingInEndevorFilter($event.source.selected.viewValue)">
                <mat-option *ngFor="let type of LMissingInEndevor" [value]="type">
                  {{ type }}
                </mat-option>
          </mat-select>
        </mat-form-field>  
      </mat-header-cell>
      <mat-cell *matCellDef="let Object" [ngClass]="'w-05'"> {{Object.MissingInEndevor}} </mat-cell>
    </ng-container>
  

    <!-- Delete button -->
  <ng-container matColumnDef="Delete">
      <mat-header-cell *matHeaderCellDef  [ngClass]="'w-03'"> Delete </mat-header-cell>
      <mat-cell  *matCellDef="let Object" [ngClass]="'w-03'" > <button (click)="Delelement(Object.id);"><mat-icon color="primary" >delete</mat-icon></button> </mat-cell>
  </ng-container>

    <!-- Edit button -->
  <ng-container matColumnDef="Edit">
      <mat-header-cell *matHeaderCellDef  [ngClass]="'w-03'"> Edit </mat-header-cell>
      <mat-cell  *matCellDef="let Object" [ngClass]="'w-03'" > 
        <button (click)="Loadform(Object.id,Object.MemberName,Object.GenName,Object.Type,Object.Project_Name,Object.Release,Object.Change_Type,Object.Developer,Object.CCID);">
          <mat-icon color="primary" >create</mat-icon></button> </mat-cell>
  </ng-container>

    <!-- Table trailer  -->
  <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row (click)="logData(row )" *matRowDef="let row; columns: displayedColumns;"></mat-row>
    </mat-table>
    <mat-paginator [pageSizeOptions]="[25, 10, 20]" showFirstLastButtons></mat-paginator>
  </div> 

    <!-- Table end -->
    <app-lookup-read #Lookup></app-lookup-read>