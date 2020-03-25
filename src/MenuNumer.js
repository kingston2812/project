import React from 'react';
import './Colum.css';
import 'antd/dist/antd.css';
import './index.css';
import { Menu } from 'antd';
import {CaretDownOutlined,} from '@ant-design/icons';
import { Layout, Breadcrumb } from 'antd';
import Bisec from './Bisection';
import Onepoint from './Onepoint';
import Newton from './Newton';
import False from './False';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
const { Content} = Layout;
const { SubMenu } = Menu;

class Menutest extends React.Component {

  state = {
    current: '',
  };

  handleClick (Page){
    
    this.setState({
      current: Page,
    });
  };

  render() {
    return (   
        <Router>  
            <Layout >
           
                <Menu 
                    style={{ position: 'fixed', zIndex: 1, width: '100%' }}
                    selectedKeys={[this.state.current]} 
                    mode="horizontal"
                    theme="dark"
                    
                >
                <SubMenu
                    title={
                        <span className="submenu-title-wrapper">          
                            Root of equation 
                        <CaretDownOutlined />
                        </span>
                    }
                >      
                    <Menu.Item >Bisection<Link to="/Bisection" /></Menu.Item>
                    <Menu.Item >False Position Method<Link to="/False" /></Menu.Item>
                    <Menu.Item >One-Point Iteration Method<Link to="/Onepoint" /></Menu.Item>
                    <Menu.Item >Newton-Raphson Method<Link to="/Newton" /></Menu.Item>
                    <Menu.Item >Secant Method</Menu.Item>
                </SubMenu>

                <SubMenu
                    title={
                        <span className="submenu-title-wrapper">
                            Linear Algebra 
                        <CaretDownOutlined />
                        </span>
                        
                    }
                >
                    <Menu.Item >Cramer' Rule</Menu.Item>
                    <Menu.Item >Gauss Elimination Method</Menu.Item>
                    <Menu.Item >Gauss Jordan Method<Link to="/Newton" /></Menu.Item>
                    <Menu.Item >Metrix Invertion Method</Menu.Item>
                    <Menu.Item >LU Decomposition Method</Menu.Item>
                    <Menu.Item >Jacobi Iteration Method</Menu.Item>
                    <Menu.Item >Gauss-Seidel Iteration Method</Menu.Item>
                    <Menu.Item >Conjugate Gradient Method</Menu.Item>
                </SubMenu> 

                <SubMenu
                    title={
                        <span className="submenu-title-wrapper">
                            Iterpolation and Extrapolation
                        <CaretDownOutlined />
                        </span>
                        
                    }
                >
                    <Menu.Item >Newton's Divided-Difference</Menu.Item>
                    <Menu.Item >Lagrange Polynomials</Menu.Item>
                    <Menu.Item >Spline Iterpolation</Menu.Item>
                </SubMenu>   

                <SubMenu
                    title={
                        <span className="submenu-title-wrapper">
                            Integration Techniques 
                        <CaretDownOutlined />
                        </span>
                        
                    }
                >
                    <Menu.Item >Trapzoidal's Rule</Menu.Item>
                    <Menu.Item >Composite Trapezoidal's Rule</Menu.Item>
                    <Menu.Item >Simson's Rule</Menu.Item>
                    <Menu.Item >Composite Sinson's Rule</Menu.Item>

                </SubMenu>              
                </Menu>   
       
                    <Content 
                        className="site-layout" 
                        style={{ padding: '0 50px', marginTop: 50 }}                    
                        >
                        <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb> 
                        <Route path="/Bisection" component={Bisec}/>
                        <Route path="/Onepoint" component={Onepoint}/>
                        <Route path="/Newton" component={Newton}/>
                        <Route path="/False" component={False}/>
                    </Content>
                
            </Layout>
        </Router>  
    );
  }
}
export default Menutest;