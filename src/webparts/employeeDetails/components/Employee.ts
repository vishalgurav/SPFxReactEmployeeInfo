import { IEmployee } from "./IEmployee";

export class  Employee{        
    constructor(item: IEmployee) {
      this._name = item.FirstName;
      this._address = item.Address;
      this._type = item.ServiceType;
      this._id=item.ID;
  }  
  private _name : string;
  public get name() : string {
    return this._name;
  }
  public set name(v : string) {
    this._name = v;
  }
  
  private _address : string;
  public get address() : string {
    return this._address;
  }
  public set address(v : string) {
    this._address = v;
  }
  
  private _type : string;
  public get type() : string {
    return this._type;
  }
  public set type(v : string) {
    this._type = v;
  }
  
  private _id : string;
  public get id() : string {
    return this._id;
  }
  public set id(v : string) {
    this._id = v;
  }
  
}