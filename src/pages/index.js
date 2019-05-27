import styles from './index.less';
import React, {PureComponent} from 'react';

import {
  NavBar,
  Icon,
  WhiteSpace,
  Card, WingBlank,
  List,
  Toast,
  Modal,
} from 'antd-mobile';
import {decodeAddress} from '@polkadot/keyring/address';
import {u8aToHex} from '@polkadot/util';

const Item = List.Item;
const Brief = Item.Brief;

const data = Array.from(new Array(3)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

const prompt = Modal.prompt;

const coinIcons = {
  BTC: "data:image/png;base64,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",
  SDOT: "data:image/png;base64,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"
}

function getPub(address) {
  return u8aToHex(decodeAddress(address));
}

let storage;
if (window.localStorage) {
  storage = window.localStorage;
}

const CoinDecimals =  {
  'BTC': 8,
  'SDOT': 3
};

class Index extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      show: !location.port, // 如果不是 dva 2.0 请删除
      address: storage.getItem("userAddress") || "",
      userPublicKey: "",
      blockHeight: 0,
      intentions: [],
      coinIntentions: {},
      userRecords: {},
      totalPCX: 0,
    };
    this.websocket = null;
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

    if ('WebSocket' in window) {
      this.websocket = new WebSocket('wss://w1.chainx.org/ws');
      this.initWebSocket();
    } else {
      alert('当前浏览器 Not support websocket')
    }
  }

  componentWillUnmount() {
    this.closeWebSocket()
  }

  initWebSocket () {
    //连接错误
    this.websocket.onerror = () => {
      Toast.fail("WebSocket连接发生错误" + '   状态码：' + this.websocket.readyState);
    };

    // //连接成功
    this.websocket.onopen = () => {
      console.log("WebSocket连接成功" + '   状态码：' + this.websocket.readyState);
      this.subscribeNewHead();
    };

    //收到消息的回调
    this.websocket.onmessage = (event) => {
      var data = JSON.parse(event.data);
      // console.log(data);
      if (data) {
        if (data.method == "chain_newHead") {
          const blockHeight = parseInt(data.params.result.number.substr(2), 16);
          this.setState({
            blockHeight
          }, () => this.getPseduIntentions());
        } else if (data.id == 13) {
            let coinIntentions = {};
            for(var i = 0; i < data.result.length; i++) {
              var d = data.result[i];
              coinIntentions[d.id] = d;
            }

            this.setState({
                intentions: data.result,
                coinIntentions,
            }, () => this.getUserRecord());
        } else if (data.id == 14) {
            let userRecords = {}
            for(var i = 0; i < data.result.length; i++) {
              var d = data.result[i];
              userRecords[d.id] = d;
            }
            this.setState({
              userRecords
            });
        } else if (data.id == 15) {
          for(var i = 0; i < data.result.data.length; i++) {
            var d = data.result.data[i];
            if (d.name == "PCX") {
              let detail = d.details;
              let totalPCX = detail.Free + detail.ReservedStaking + detail.ReservedDexFuture + detail.ReservedDexSpot + detail.ReservedStakingRevocation + detail.ReservedWithdrawal;
              this.setState({
                totalPCX: totalPCX / Math.pow(10, 8)
              });
              break;
            }
          }
        }
      }
    };

    //连接关闭的回调
    this.websocket.onclose = () => console.log("WebSocket连接关闭" + '   状态码：' + this.websocket.readyState);
  }
  //websocket发送消息
  subscribeNewHead() {
    this.websocket.send('{"id":12,"jsonrpc":"2.0","method":"chain_subscribeNewHead","params":[]}')
  }

  closeWebSocket() {
    this.websocket.close()
  }
  getPseduIntentions() {
    this.websocket.send('{"id":13,"jsonrpc":"2.0","method":"chainx_getPseduIntentions","params":[]}');
  }
  getUserRecord() {
    if (!this.state.address) {
      return;
    }
    let userPublicKey = this.state.userPublicKey;

    if (!userPublicKey) {
      userPublicKey = getPub(this.state.address.trim());
      this.setState({
        userPublicKey
      });
    }
    this.websocket.send('{"id":14,"jsonrpc":"2.0","method":"chainx_getPseduNominationRecords","params":["' + userPublicKey + '"]}');
    this.websocket.send('{"id":15,"jsonrpc":"2.0","method":"chainx_getAssetsByAccount","params":["' + userPublicKey + '", 0, 100]}');
  }

  search = () => {
    prompt('Chainx 地址', '请输入您的chainx地址',[
      {
        text: 'Close'
      },
      {
        text: '好啦',
        onPress: value => {
          const address = value.trim();
          storage.setItem("userAddress", address);
          const userPublicKey = getPub(address);

          this.setState({
            address,
            userPublicKey
          },
            () => {
              this.getUserRecord();
            }
          );
        }
      },
    ],
    'default', null);
  }

  getLixi = (id) => {
    if (!this.state.coinIntentions[id] || !this.state.userRecords[id]) {
      return '-';
    }
    var intention = this.state.coinIntentions[id];
    var record = this.state.userRecords[id];
    var coinTotalWeight = intention.lastTotalDepositWeight + intention.circulation * (this.state.blockHeight - intention.lastTotalDepositWeightUpdate);

    var userTotalWeight = record.lastTotalDepositWeight + record.balance * (this.state.blockHeight - record.lastTotalDepositWeightUpdate);
    var interestment = (userTotalWeight / coinTotalWeight) * intention.jackpot * 0.9 / Math.pow(10, 8);
    return interestment.toFixed(8) + ' PCX';
  }
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          leftContent={"区块高度: " + this.state.blockHeight}
          rightContent={
            <Icon key="0" type="search"
            onClick={this.search} />
          }
        >Chainx Mining</NavBar>
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <List renderHeader={() => `Chainx 资产 (${this.state.address})`} className="my-list" >
            <Item multipleLine extra={this.state.totalPCX.toFixed(8) + ' PCX'} thumb="data:image/png;base64,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" >
              PCX <Brief>chainx</Brief>
            </Item>
          </List>

          <WhiteSpace size="lg" />
          {this.state.intentions.map((i, k) => {
            return <div key={k}>
              <Card className={styles.assetCard}>
                <Card.Header
                  title={i.id}
                  thumb={coinIcons[i.id]}
                  extra={<span>{i.circulation / Math.pow(10, CoinDecimals[i.id])} {i.id}</span>}
                />
                <Card.Body>
                  <div className={styles.assetBlock}>
                    <div className={styles.assetBlockItem}>
                      <h3>奖池金额</h3>
                      <p>{i.jackpot / Math.pow(10, 8)} PCX</p>
                    </div>
                    <div className={styles.assetBlockItem}>
                      <h3>我的总余额</h3>
                      <p>{this.state.userRecords[i.id] ? (this.state.userRecords[i.id].balance / Math.pow(10, CoinDecimals[i.id])) + ' ' +  i.id : '-'}</p>
                    </div>
                    <div className={styles.assetBlockItem}>
                      <h3>待领利息</h3>
                      <p>{this.getLixi(i.id)}</p>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer content={`1: ${i.power / Math.pow(10, 8)} PCX`}
                /**extra={<!div>预计1小时挖 123.23112231 PCX</div>} **/
                />
              </Card>
              <WhiteSpace size="lg" />
            </div>
          })}
        </WingBlank>
      </div>
    );
  }
}

export default Index;
