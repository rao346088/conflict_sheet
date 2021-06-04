

export interface IObject { id :Number, 
    MemberName :String;
    GenName :String;
    Type:String;
    Project_Name:String;
    Release:String;
    Change_Type:String;
    Developer:String;
    CCID:String;
    Conflict?: String;
    MissingInEndevor?: String
    MissingConflict?: String
    action?:String;
    created_by?: String; 
    created_on?:any;
    updated_by?:String;
    updated_on?:any; 
  }

export interface TObject {
  MissingConflict?: String; id :Number, 
    MemberName :String;
    GenName :String;
    Type:String;
    Project_Name:String;
    Release:String;
    Change_Type:String;
    Developer:String;
    CCID:String;
    Conflict?: String;
    MissingInEndevor?: String;
    Select ?: Boolean;
    Delete?;
    Edit?
   
}



export interface EndvcsvLayout { id :Number, 
    CCID:String;
    Stage: String;
    MemberName :String;
    Type:String;
    GenName :String;
    Developer:String  
           
}

export interface EndvLayout { id :Number, 
    MemberName :String;
    GenName :String;
    Type:String;
    
    Developer:String;
    CCID:String;
    MissingConflict:String;
    IncorrectCCID : String 
       
}

export interface MLLayout { id :Number, 
    MLType :String;
    MLName :String;
    Action?:String;
    Created_by?: String; 
    Creater_on?:String;
    Updated_by?:String;
    Updated_on?:String;     
}

export interface MLTLayout { id :Number, 
    MLType :String;
    MLName :String;
    Delete;
    Edit
   
}

export interface CSVLayout { firstName :String, 
    lastName :String;
    email :String;
    phoneNumber:Number,
    title : String,
    occupation : String 
   
}

export interface OBJCSVLayout { MemberName :String;
    GenName :String;
    Type:String;
    Change_Type:String
    ErrorMsg: String 
    Status: boolean

}

export interface Control_Total { Total_REC :Number;
    Good_REC :Number;
    BAD_REC:Number
      
}
export interface UserLayout { id :Number;
    email :String;
    password:string;
    Role: String
      
}

export interface ActionDataLayout {
     id? :Number;
     action?:String;
     service_name?:String;
     created_by?: String; 
     creater_on?:String;
     updated_by?:String;
     updated_on?:String; 
}