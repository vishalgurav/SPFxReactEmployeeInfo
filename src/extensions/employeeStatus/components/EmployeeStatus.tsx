import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';

import styles from './EmployeeStatus.module.scss';

export interface IEmployeeStatusProps {
  text: string;
}

const LOG_SOURCE: string = 'EmployeeStatus';

export default class EmployeeStatus extends React.Component<IEmployeeStatusProps, {}> {
  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: EmployeeStatus mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: EmployeeStatus unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.cell}>
        { this.props.text }
      </div>
    );
  }
}
