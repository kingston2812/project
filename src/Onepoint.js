import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Input } from 'antd';
import './Colum.css';
import { Button } from 'antd';
import {compile} from 'mathjs';
import {Table} from 'antd';
import { LineChart,XAxis, YAxis, Tooltip, CartesianGrid ,Legend,Line } from 'recharts';
var columns = [
    {
      title: 'Iteration',
      dataIndex: 'iteration',
    },
    {
      title: 'XOLD',
      dataIndex: 'xold',
    },
    {
      title: 'XNEW',
      dataIndex: 'xnew',
    },
    {
        title: 'ERROR',
        dataIndex: 'error',
    },
];
var dataIn = []
class Bisection extends Component{
    constructor(props) {
        super(props); 
        this.state={
            x : '',
            fun : '',
            showOutputCard: false,
        };
        this.createdata = this.createdata.bind(this);
    }
    func (X){    
        var expr=compile(this.state.fun);
        let scope = {x : parseFloat(X)};
        return expr.eval(scope)
    }
    handleChancefun=(event)=>{
        this.setState({
          fun: event.target.value
        })
    }
    handleChance=(event)=>{
        this.setState({
          x : event.target.value
        })
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(xold, xnew, error) {
        dataIn = []
        for (var i = 0; i < xold.length; i++) {
            dataIn.push({
                iteration: i + 1,
                xold: xold[i],
                xnew: xnew[i],
                error: error[i]
            });
        }
    }
    createdata(xin){
        var n=0;
        var xnew=xin;
        var xold=0;
        var data = []
        data['xold'] = []
        data['xnew'] = []
        data['error'] = []
        var sum = parseFloat(0.000000);
        do{
            xold = xnew;
            xnew = this.func(xold);
            sum = this.error(xnew, xold);         
            data['xold'][n] = xold;
            data['xnew'][n] = xnew;
            data['error'][n] = sum.toFixed(8);
            n++;
        } while (Math.abs(sum) > 0.000001);
        this.createTable(data['xold'], data['xnew'], data['error']);
        this.setState({
            showOutputCard: true,
        })
    }
    render(){
        return(
            <body>
                <div id="div-1" class="col-50">
                    <h1>One-Point Iteration Method</h1>
                    <Input 
                        placeholder="Funtion" 
                        style={{width:100}}
                        onChange={this.handleChancefun}
                    />               
                    <br />
                    <br />
                    <Input 
                        placeholder="X Begin"   
                        style={{width:100}}
                        onChange={this.handleChance}
                    />  
                    <br />
                    <br />
                    <Button 
                        type="primary"
                        onClick={()=>this.createdata(parseFloat(this.state.x))}
                    >Enter</Button>
                    
                    <br />
                    <br />
                    
                </div>
                <div id="div-2" class="col-50">    
                    
                    <LineChart width={500} height={250} data={dataIn}
                        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                        <XAxis dataKey="error" />
                        <YAxis />
                        <CartesianGrid  />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Line name="error" type="monotone" dataKey="error" stroke="#FF2323" />
                    </LineChart>
                    <br />
                    <br />
                    <Table columns={columns} dataSource={dataIn} size="middle" /> 

                </div>    
            </body>
            
        );
    }
}
export default Bisection; 