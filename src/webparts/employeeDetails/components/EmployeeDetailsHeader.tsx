import * as React from "react";
import { IEmployeeDetailsProps } from "./IEmployeeDetailsProps";
import pnp from "sp-pnp-js";

export default class EmployeeDetailsHeader extends React.Component<
  IEmployeeDetailsProps,
  any
> {
  public constructor(props: IEmployeeDetailsProps, any) {
    super(props);
    this.state = {
      list: null
    };
  }
  public render(): React.ReactElement<IEmployeeDetailsProps> {
    return (
      <div className={"ms-Grid"}>
        <h1>{this.state.list}</h1>
      </div>
    );
  }
  public componentDidMount() {
    this._getListName();
  }
  private _getListName(): void {
    pnp.sp.web.lists
      .getByTitle(`Employees`)
      .get()
      .then(response => {
        debugger;
        let list = response.EntityTypeName;
        this.setState({ list: list });
      });
  }
}
