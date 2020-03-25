import React, { Component } from 'react'
import './App.css';
import { Menu, Input, Row, Col, Button, Card, Table } from 'antd';
import { Carousel } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import { range, compile } from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';


var dataInTable = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "XL",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "XR",
        dataIndex: "xr",
        key: "xr"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];
const xValues = range(-10, 10, 0.5).toArray();
var fx = " ";
class Appg extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            showOutputCard: false,
            showGraph: false,
            moveLeft: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.bisection = this.bisection.bind(this);
    }
    map (x) {
        dataInTable ['y'] = xValues
        return compile(fx).eval({x: x})
    }
    bisection(xl, xr) {
        fx = this.state.fx;
        var increaseFunction = false;
        var xm = 0;
        var sum = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        if (this.func(xl) < this.func(xr)) {
            increaseFunction = true;
        }
        do {
            xm = (xl + xr) / 2;
            if (this.func(xm) * this.func(xr) < 0) {
                sum = this.error(xm, xr);
                if (increaseFunction) {
                    xl = xm;
                }
                else {
                    xr = xm;
                }
            }
            else {
                sum = this.error(xm, xl);
                if (increaseFunction) {
                    xr = xm;
                }
                else {
                    xl = xm;
                }
            }
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xm.toFixed(8);
            data['error'][n] = Math.abs(sum).toFixed(8);
            n++;
        } while (Math.abs(sum) > 0.000001);
        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(xl, xr, x, error) {
        dataInTable = []
        for (var i = 0; i < xl.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
                error: error[i]
            });
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const options = {
            animationEnabled: true,
            title: {
                text: "Number of New Customers"
            },
            axisY: {
                title: "Number of Customers",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "spline",
                name: "2016",
                showInLegend: true,
                dataPoints: [
                    {
                        x: range(-10, 10, 0.5).toArray(),
                        y: xValues.map(function (x) {
                            return compile(fx).eval({ x: x })
                        }),
                        type: 'scatter',
                        marker: { color: 'red' },
                    },
                ]
            }]
        }
        return (
            
                <Layout>
                    <Content
                        style={{
                            background: '#FFCC66',
                            padding: 24,
                            margin: 30,
                            minHeight: 280,
                            fontSize: 24
                        }}
                        onChange={this.handleChange}
                    >
                        {/*-----------------------------------------ปุ่มINPUTสมการ----------------------------------------------------*/}
                        <Row gutter={[40, 40]}
                            title={"Input Bisection"}
                            bordered={true}
                            style={{ float: "center" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <Col span={10} offset={7}>
                                <Input size="large" placeholder="Basic usage" name="fx" />
                                <br></br>
                                <br></br>
                                <Input size="large" placeholder="Basic usage" name="xl" />
                                <br></br>
                                <br></br>
                                <Input size="large" placeholder="Basic usage" name="xr" />
                                <br></br>
                                <br></br>
                                <Button id="print2" type="primary" shape="round" size="large"
                                    onClick={
                                        () => this.bisection(parseFloat(this.state.xl), parseFloat(this.state.xr))
                                    }
                                >
                                    INPUT
                                </Button>
                            </Col>
                        </Row>
                        <br></br>
                        {/*-----------------------------------------------Graph-------------------------------------------------*/}
                        <Row gutter={[2, 2]}>
                            <Col span={10} offset={7}>
                                <Card
                                    title={"Output"}
                                    bordered={true}
                                >
                                    <LineChart width={730} height={250} data={dataInTable}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis dataKey="error" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend verticalAlign="top" height={36} />
                                        <Line name="pv of pages" type="monotone" dataKey="error" stroke="#8884d8" />
                                    </LineChart>
                                </Card>
                            </Col>
                        </Row>
                        {/*---------------------------------------------------------------------------------------------*/}
                        <Row gutter={[2, 2]}>
                            <Col span={10} offset={7}>
                                <Card
                                    title={"Output"}
                                    bordered={true}
                                    id="outputCard"
                                >
                                    <Table columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
                                    ></Table>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            
        );
    }
}
export default Appg