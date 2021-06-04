export interface IPackage {
    
    id: number;
    ObjectName: string;
    ObjectTYPE: any;
    MissingElement: String
    Select ?: boolean;
    Delete ?: any;
    Edit?: any;
    cnt?:Number;
    Action?:String;
    Created_by?: String; 
    Created_on?:any;
    Updated_by?:String;
    Updated_on?:any; 
}

export interface PackCnt {
    
    id?: number;
    ObjectTYPE: string;
    cnt?:number
}
