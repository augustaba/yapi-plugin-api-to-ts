import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Input, Button, message } from "antd";
import utils from '../utils';

class LeGaoTab extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            api: ''
        }
    }
    async componentDidMount() {
        const { match: { params: { actionId } } } = this.props;
        const { data: { path, method, title } } = await utils.getApiDetail(actionId);
        const rootName = utils.pathToTypeName(path);
        const reqName = utils.pathToRequestTypeName(path)
        const apiName = utils.pathToApiName(path)
        const api = `/**\n* ${title}\n*/\nexport function ${apiName}(data: ${reqName}) {\n\treturn axios.${method.toLowerCase()}<${rootName}['data']>('${path}', data).then(res => res.data);\n}`
        this.setState({
            api
        })
    }
    copy = () => {
      this.textArea.textAreaRef.select()
      document.execCommand('copy')
      message.success('copy success')
    }
    render() {
        return (
          <div style={{ padding: '1em' }}>
            <Card>
              <Button style={{marginBottom: '10px'}} onClick={this.copy}>点我复制</Button>
              <Input.TextArea ref={ele => this.textArea = ele} value={this.state.api} rows={20} />
            </Card>
          </div>
        );
    }
}

export default withRouter(LeGaoTab);