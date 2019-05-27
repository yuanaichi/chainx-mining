import React  from 'react';
import styles from './index.less';
import { formatMessage, getLocale } from 'umi/locale';

const { location } = window;

class BasicLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    /* 如果不是 dva 2.0 请删除 start */
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
    /* 如果不是 dva 2.0 请删除 end */
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles['layout']}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default BasicLayout;
