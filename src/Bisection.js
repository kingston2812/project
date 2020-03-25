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
      title: 'XL',
      dataIndex: 'xl',
    },
    {
      title: 'XR',
      dataIndex: 'xr',
    },
    {
        title: 'X',
        dataIndex: 'x',
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
            xl : 0,
            xr : 0,
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
    handleChance=(event)=>{
        this.setState({
          xl: event.target.value
        })
    }
    handleChance2=(event)=>{
        this.setState({
          xr: event.target.value
        })
    }
    handleChancefun=(event)=>{
        this.setState({
          fun: event.target.value
        })
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(xl, xr, x, error) {
        dataIn = []
        for (var i = 0; i < xl.length; i++) {
            dataIn.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
                error: error[i]
            });
        }
    }
    createdata(xl,xr){
        var n=0;
        var xm=0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        var sum = parseFloat(0.000000);
        do{
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            xm = (xl + xr) / 2;
            if (this.func(xm) * this.func(xr) < 0) {
                sum = this.error(xm, xr);
                xl = xm;
            }
            else {
                sum = this.error(xm, xl);
                xr = xm;
            }
            
            data['x'][n] = xm.toFixed(8);
            data['error'][n] = sum.toFixed(8);
            n++;
        } while (Math.abs(sum) > 0.000001);
        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutputCard: true,
        })
    }
    render(){
        return(
            <body>
                <div id="div-1" class="col-50">
                    <h1>Bisection Method</h1>
                    <Input 
                        placeholder="Funtion" 
                        style={{width:100}}
                        onChange={this.handleChancefun}
                    />               
                    <br />
                    <br />
                    <Input 
                        placeholder="X(Left)" 
                        style={{width:100}}
                        onChange={this.handleChance}
                    />  
                    <br />
                    <br />
                    <Input 
                        placeholder="X(Right)" 
                        style={{width:100}}
                        onChange={this.handleChance2}
                    />  
                    <br />
                    <br />
                    <Button 
                        type="primary"
                        onClick={()=>this.createdata(parseFloat(this.state.xl), parseFloat(this.state.xr))}
                    >Enter</Button>
                    
                    <br />
                    <br />
                        <h2><code>f(x) =  {this.state.fun} </code></h2>
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