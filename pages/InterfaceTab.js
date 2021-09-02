import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Input, Button, message } from "antd";
import download from 'downloadjs';
import utils from '../utils';

class InterfaceTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ts: '',
      rootName: 'Root',
      reqName: 'Root',
      requestTs: ''
    }
  }
  async componentDidMount() {
    const { match: { params: { actionId } } } = this.props;
    const { data: { res_body: schema, req_body_other: reqBodySchema, path } } = await utils.getApiDetail(actionId);
    const rootName = utils.pathToTypeName(path);
    const reqName = utils.pathToRequestTypeName(path)
    const data = await utils.translate(schema, rootName);
    const reqData = await utils.translate(reqBodySchema, reqName)
    console.log(data, reqData)
    this.setState({
      rootName,
      reqName:reqName,
      requestTs: reqData.ts,
      ts: data.ts
    });
  }
  handleDownload = () => {
    download(this.state.ts, `${this.state.rootName}.ts`);
  };
  copy = (type) => {
    this[`${type}Ref`].textAreaRef.select()
    document.execCommand('copy')
    message.success('copy success')
  }
  render() {
    return (
      <div style={{ padding: '1em' }}>
        <Card>
          <div></div>
          {
            this.state.requestTs && <div>
              <Button style={{marginBottom: 10}} onClick={() => this.copy('request')}>request body参数 query参数不支持 点我复制哦</Button>
              <div></div>
              <Input.TextArea ref={ele => this.requestRef = ele} value={this.state.requestTs} rows={20} />
            </div>
          }
          <div></div>
          <Button onClick={() => this.copy('response')} style={{marginBottom: 10, marginTop: 10}}>response 点我复制哦</Button>
          <div></div>
          <Input.TextArea ref={ele => this.responseRef = ele} value={this.state.ts} rows={20} />
        </Card>
      </div>
    );
  }
}

export default withRouter(InterfaceTab);